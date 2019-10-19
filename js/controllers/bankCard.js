/**
 * Created by lin on 2016/12/14.
 * 银行卡页面
 */
starter.controller('bankCardCtrl',function($scope,User,Conn,App){
	var ms = this;
    ms.insId = App.stateParams.insId;
	
	$scope.$on('$ionicView.enter', function () {
        ms.doRefresh();
    });

	ms.doRefresh = function () {
        var param = {
            token: User.getToken()
        };
        //获取银行卡
        Conn.get("/card/bankCardList", param).then(function (res) {
            if (res.code === 200) {
                ms.walletBank = res.data;
                for(var i in res.data){
                    ms.walletBank[i].cardNo = res.data[i].cardNo.slice(-4);
                }
            } else {
                Utils.toast(res.message);
            }
        });
    }
});