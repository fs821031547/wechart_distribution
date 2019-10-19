/**
 * Created by lin on 2016-12-07.
 * 个人信息管理
 */
starter.controller('myWalletCtrl',function($scope,User,Conn,App,Utils,$filter){
	var ms = this;
    ms.insId = App.stateParams.insId;
    ms.pageIndex = 1;
    ms.pageSize = 20;
     $scope.$on('$ionicView.enter', function () {
         ms.canLoadMore = false;
         ms.myWallet();
    });

    ms.myWallet=function(){
        var param = {
            token: User.getToken()
        };
        Conn.get("/account/accountInfo", param).then(function (res) {
            if (res.code === 200) {
                var param = {
                    token: User.getToken()
                };
                //获取余额
                ms.walletBalance = res.data.mny; //余额
                //获取月度消费
                Conn.get("/account/transactionMonthSum",param).then(function (res) {
                    if (res.code === 200) {
                        if(res.data.length == 0){
                            ms.monthData = [{
                                expenditure:0,
                                income:0,
                                year:new Date().getYear()+1900,
                                month:new Date().getMonth()+1
                            }];
                        }else{
                            ms.monthData = res.data;
                        }
                        //获取消费记录
                        ms.getData();
                    } else {
                        Utils.toast(res.message);
                    }
                });
            } else {
                Utils.toast(res.message);
            }
        });
        //获取银行卡
        Conn.get("/card/bankCardList", param).then(function (res) {
            if (res.code === 200) {
                if(res.data == null){
                    ms.walletBankNum = 0;
                }else{
                    ms.walletBankNum = res.data.length;
                }
            } else {
                Utils.toast(res.message);
            }
        });
    };
    
    ms.getData = function () {
        var param = {
            pageIndex:ms.pageIndex,
            pageSize:ms.pageSize,
            token: User.getToken()
        };
        Conn.get("/account/userAccountTransaction", param).then(function (res) {
            if (res.code === 200) {
                Utils.paging(res.data,ms);
                if(!!res.data) {
                    ms.formatData = ms.format(ms.data);
                    ms.addMonth();
                }
            } else {
                Utils.toast(res.message);
            }
        });
    };

    ms.format = function (data) {
        if(!data || data.length<=0){
            return;
        }
        var result = [];
        var dayArray = [];
        var childResult;
        var tmp;

        for(var i=0; i<data.length; i++){
            tmp = $filter('date')(new Date(data[i].transactionTime), 'yyyy-MM');
            if(dayArray.indexOf(tmp) < 0 ){
                dayArray.push(tmp);
            }
        }

        for(var m=0; m<dayArray.length; m++){
            childResult = {
                childResult:[]
            };
            for(var j in data){
                if(dayArray[m] == $filter('date')(new Date(data[j].transactionTime), 'yyyy-MM')){
                    childResult.childResult.push(data[j]);
                }
            }
            result.push(childResult);
        }
        return result;
    };

    ms.addMonth = function () {
        for (var i in ms.monthData){
            for(var j in ms.formatData){
                var date = new Date(ms.formatData[j].childResult[0].transactionTime);
                if(ms.monthData[i].month == (date.getMonth()+1) && ms.monthData[i].year == date.getFullYear()){
                    ms.formatData[j].year = ms.monthData[i].year;
                    ms.formatData[j].month = ms.monthData[i].month;
                    ms.formatData[j].income = ms.monthData[i].income;
                    ms.formatData[j].expenditure = ms.monthData[i].expenditure;
                }
            }
        }
    }
});