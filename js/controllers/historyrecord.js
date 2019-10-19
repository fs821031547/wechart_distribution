

starter.controller('HistoryRecordCtrl', function($scope,Utils,App,Conn,User,$filter) {
    var ms = this;
    ms.insId = App.stateParams.insId;
    ms.pageIndex = 1;
    ms.pageSize = 20;
    $scope.$on('$ionicView.enter', function () {
        ms.canLoadMore= false;
        ms.getMonyhData();
    });

    ms.doRefresh = function () {
        ms.pageIndex = 1;
        ms.canLoadMore = false;
        ms.getData();
    };

    ms.getMonyhData = function () {
        var param = {
            token:User.getToken()
        };
        //获取月度消费
        Conn.get("/order/getFinishOrderMonthSum",param).then(function (res) {
            if (res.code === 200) {
                if(res.data.length == 0){
                    ms.monthData = [{
                        year:new Date().getYear()+1900,
                        month:new Date().getMonth()+1,
                        sum:0
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
    };

    ms.getData = function () {
        var param = {
            token:User.getToken(),
            pageIndex: ms.pageIndex,
            pageSize: ms.pageSize
        };
        Conn.get("/order/getFinishOrder", param).then(function (res) {
            if (res.code === 200) {
                Utils.paging(res.data.data,ms);
                if(!!res.data) {
                    ms.formatData = $filter('monthData')(ms.data);
                    ms.addMonth();
                }
            } else {
                Utils.toast(res.message);
            }
        });
    };

    ms.addMonth = function () {
        for (var i in ms.monthData){
            for(var j in ms.formatData){
                var date = new Date(ms.formatData[j].childResult[0].createTime);
                if(ms.monthData[i].month == (date.getMonth()+1) && ms.monthData[i].year == date.getFullYear()){
                    ms.formatData[j].year = ms.monthData[i].year;
                    ms.formatData[j].month = ms.monthData[i].month;
                    ms.formatData[j].sum = ms.monthData[i].sum;
                }
            }
        }
    }
});