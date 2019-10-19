/**
 * Created by lin on 2016/12/14.
 * 新增银行卡
 */
starter.controller('addBankCardCtrl',function($scope,$rootScope,User,Conn,App,Utils){
    var ms = this;
    ms.insId = App.stateParams.insId;
    $scope.$on('$ionicView.enter', function () {
        ms.cardNo = null;
    });

    ms.verification = function () {
        var exp = new RegExp("^\\d{16,19}$","g");
        var cardNo = (ms.cardNo+"").replace(/\s/g, '');
        if(exp.test(cardNo)){
            var param = {
                token:User.getToken(),
                card:ms.cardNo
            };
            Conn.get("/card/verification",param).then(function (res) {
                if(res.code == 200){
                    ms.bankName = res.data.bankName;
                    ms.ver = res.data.validated;
                }
            })
        }
    };

    ms.saveBank = function(){
        if(!ms.cardHolder){
            Utils.toast("请输入持卡人姓名");
            return;
        }
        var exp = new RegExp("^\\d{16,19}$","g");
        var cardNo = (ms.cardNo+"").replace(/\s/g, '');
        if(!cardNo || !exp.test(cardNo)){
            Utils.toast("请输入正确的储蓄卡号");
            return;
        }
        if(!ms.ver){
            Utils.toast("不支持卡号!");
            return;
        }
        var param = {
            token:User.getToken(),
            cardNo:ms.cardNo,
            cardHolder:ms.cardHolder
        };
        Conn.post("/card/addBankCard", param).then(function (res) {
            if (res.code === 200) {
                $rootScope.topGoBack();
            } else {
                Utils.toast(res.message);
            }
        });
    }
});