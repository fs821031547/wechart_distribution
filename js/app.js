// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic', 'myFilters'])
    .run(function ($ionicPlatform, Utils,$rootScope,User,App) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
        });
        var needLoginView = ['person', 'historyrecord', 'orderDetails', 'dealOrder', 'myWallet', 'bankCard'
            , 'balance', 'withdraw'];//需要登录的页面state
        var noNeedCheckIns = ['poster','share','speakSkill'];//不需要检查insId的页面
        $rootScope.ipName = App.ipName;
        $rootScope.$on('$stateChangeStart', function (event, toState, param, fromState, fromParams) {
            if(param && param.insId){
                $rootScope.insId = param.insId;
            }
            if (!(noNeedCheckIns.indexOf(toState.name) >= 0)){
                if(!param.insId){
                    Utils.toast("驾校错误,请重新进入");
                }
            }
            if (needLoginView.indexOf(toState.name) >= 0 && (!User.getToken())) {
                Utils.toast("请先登录");
                App.state.go("login",{insId:param.insId});//跳转到登录页
                event.preventDefault(); //阻止默认事件，即原本页面的加载
                return;
            }
        });
        Utils.registerBackButtonAction();

    })

    .config(function ($httpProvider,$ionicConfigProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $ionicConfigProvider.templates.maxPrefetch(4);
        //loading及连接失败的拦截器
        $httpProvider.interceptors.push('loading');

    });
