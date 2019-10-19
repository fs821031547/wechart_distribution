/**
 * Created by izzld on 2016-08-13.
 */
angular.module('starter')
.run(function (App,$q,$http, $state, $stateParams, $location, $ionicHistory, $ionicPopup,$ionicScrollDelegate,$interval) {
    //平常使用
    App.q = $q;
    App.http = $http;
    App.state = $state;
    App.stateParams = $stateParams;
    App.location = $location;

    //ionic系列
    App.ionHistory = $ionicHistory;
    App.ionPopup = $ionicPopup;
    App.ionScrollDelegate = $ionicScrollDelegate;
    App.interval = $interval;

});