

starter.controller('OrderDetailsCtrl', function($scope,Conn,App,Utils,User) {
    var ms = this;
    ms.id = App.stateParams.id;
    ms.insId = App.stateParams.insId;

    $scope.$on('$ionicView.enter', function () {
        ms.doRefresh();
    });

    ms.doRefresh = function () {
        ms.getData();
    };

    ms.getData = function () {
        var param = {
            token:User.getToken(),
            id:ms.id
        };
        Conn.get("/order/getOrderInfo",param).then(function (res) {
            if(res.code == 200){
                ms.data = res.data;
            }else{
                Utils.toast(res.message);
            }
        })
    }
});