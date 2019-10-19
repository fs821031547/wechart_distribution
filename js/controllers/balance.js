/**
 * Created by lin on 2016/12/09.
 * 余额
 */
starter.controller("balanceCtrl", function ($scope,User,Conn,App,Utils) {
    var ms = this;
    ms.insId = App.stateParams.insId;
    $scope.$on('$ionicView.enter', function () {
        ms.getAccountInfo();
    });

    ms.getAccountInfo=function(){
	    var param = {
        	token: User.getToken()
    	};
     	Conn.get("/account/accountInfo", param).then(function (res) {
        	if (res.code === 200) {
                ms.walletBalance = res.data.mny; //余额
        	}else {
            	Utils.toast(res.message);
        	}
      	});   	
    };
});