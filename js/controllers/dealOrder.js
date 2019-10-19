

starter.controller('DealOrderCtrl', function($scope,Conn,Utils,User,App) {
    var ms = this;
    ms.insId = App.stateParams.insId;

    ms.pageIndex = 1;
    ms.pageSize = 20;

    $scope.$on('$ionicView.enter', function () {
        ms.canLoadMore= false;
        ms.doRefresh();
    });

    ms.doRefresh = function () {
        ms.pageIndex = 1;
        ms.canLoadMore = false;
        ms.getData();
    };

    ms.getData = function () {
        var param = {
            token:User.getToken(),
            pageIndex: ms.pageIndex,
            pageSize: ms.pageSize
        };
        Conn.get("/order/getOrderList", param).then(function (res) {
            if (res.code === 200) {
                Utils.paging(res.data.data,ms);
            } else {
                Utils.toast(res.message);
            }
        });
    };
});