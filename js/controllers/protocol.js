/**
 * Created by zeng on 2016/8/18.
 * 学员协议
 */
angular.module('starter')
    .controller("ProtocolCtrl", function ($scope,App) {
            var ms = this;
        ms.insId = App.stateParams.insId;

            $scope.$on('$ionicView.enter', function () {


            });
        ms.doRefresh = function (refresh) {

        };
    });
