/**
 * Created by lin on 2016/12/13.
 * 提现页面
 */
starter.controller('withdrawCtrl',function($scope,$animate,App,Utils,Conn,User,$ionicPopup,$timeout,$rootScope){
    var ms = this;
    ms.insId = App.stateParams.insId;
    ms.keyboard = [1,2,3,4,5,6,7,8,9]; // 键盘中的值
    ms.isKeyShow = false; // 键盘是否显示
    ms.isTrue = false;
    var dom = document.getElementsByClassName('my-number-keyboard')[0]; //键盘的document
    if(ms.isKeyShow === true){
        $animate.setClass(dom,'animate-show','animate-hide');
    }
	
    $scope.$on('$ionicView.enter', function () {
        ms.price = ""; //金额
        ms.getBankList();
        ms.getBalance();
    });

    /**
     * [clickAll 将全部金额填入到表单中]
     * @Author                            何佳林
     * @DateTime 2016-12-14T10:19:21+0800
     */
    ms.clickAll = function(){
        ms.price = ms.walletBalance+"";
    };

    //限制输入小数点后两位
    ms.number = function(number){
        if( number !== 'del' ){
            if(ms.price == '0'){
                ms.price = "";
            }
            if(!ms.price && number=="."){
                ms.price = "0";
            }
            var reg = new RegExp("^\\d+(\\.\\d{0,2})?$","g");
            var tmp = ms.price +""+ number;
            if(reg.test(tmp)){
                ms.price = tmp
            }
        }else{
            ms.price = ms.price.substring(0,ms.price.length - 1);
        }
    };

    /**
     * [isKeyShowfn 控制键盘的显示与隐藏]
     * @Author                            何佳林
     * @DateTime 2016-12-09T15:22:43+0800
     * @param    {boolean}                 boolean [true时显示键盘，false时则隐藏键盘]
     */
    ms.isKeyShowfn = function(boolean){
    	ms.isKeyShow = boolean;
    	if(boolean === true){
    		$animate.setClass(dom,'animate-show','animate-hide');
    	}else{
    		$animate.setClass(dom,'animate-hide','animate-show');
    	}
    };

    ms.getBankList=function(){
        var param = {
            token: User.getToken()
        };
        //获取银行卡
        Conn.get("/card/bankCardList", param).then(function (res) {
            if (res.code === 200) {
               ms.walletBank = res.data;

               ms.currentCart = res.data[0];
               ms.currentCart.Last4 = ms.currentCart.cardNo.slice(-4);

            } else {
                Utils.toast(res.message);
            }
        });
    };

    ms.getBalance = function(){
         var param = {
            token: User.getToken()
        };       
        Conn.get("/account/accountInfo", param).then(function (res) {
            if (res.code === 200) {
                ms.walletBalance = res.data.mny/100;
                ms.mnyFrozen = res.data.mnyFrozen/100;
            } else {
                Utils.toast(res.message);
            }
        });
    };

    ms.getMoney=function(){
        if(ms.currentCart==null || ms.currentCart==undefined){
            Utils.toast("没有选择银行卡!");
            return
        }
        if(ms.price == null || ms.price == undefined || ms.price<=0){
            Utils.toast("请输入正确的金额!");
            return
        }
        if(ms.price>ms.walletBalance){
            //TODO: 弹出提示余额不足
            ms.getToastMoney();
            return;
        }else{
            var param = {
                token: User.getToken(),
                bankCardId : ms.currentCart.id,
                mny:ms.price*100
            };  
            Conn.post("/account/withdraw", param).then(function (res) {
                if (res.code === 200) {
                    Utils.toast(res.data);
                    $rootScope.topGoBack();
                    ms.getBalance();
                } else {
                    Utils.toast(res.message);
                }
            });
        }
    };

    ms.getToastMoney = function () {
        var myPopup = $ionicPopup.show({
            title: '余额不足',
            cssClass: 'Toast_popup',
            scope: $scope,
        });
        myPopup.then(function(res) {

        });
        $timeout(function() {
            myPopup.close(); //由于某种原因3秒后关闭弹出
        }, 3000);
    };
    $scope.SHOW= function(id){
        for(var i in ms.walletBank){
            if(id == ms.walletBank[i].id){
                ms.walletBank[i].Last4  = ms.walletBank[i].cardNo.slice(-4);
                ms.currentCart = ms.walletBank[i];
                ms.isTrue = false;
                break;
            }
        }
    };
    $scope.toggert = function(){
        ms.isTrue = !ms.isTrue;
    };
});