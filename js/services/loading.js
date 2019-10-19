/**
 * Created by izzld on 2016-08-11.
 */
angular.module('starter')
    .factory('loading', function ($rootScope,App,User,Utils) {
        var loading = {
            request: function (config) {

                return config;
            },
            response: function (response) {
                var indexOf = response.config.url.indexOf("http");
                if (indexOf==0) {
                    $rootScope.loading = false;
                    $rootScope.$broadcast('scroll.refreshComplete');
                    $rootScope.$broadcast('scroll.infiniteScrollComplete');
                    response.config.responseTimestamp = new Date().getTime();
                    if (response.data.code === 700 || response.data.code === 702) {
                        //忘记前一个网页
                        App.ionHistory.nextViewOptions({
                            disableBack: true
                        });
                        var ms = {};
                        ms.insId = $rootScope.insId;
                        if (App.location.path() !== '/login') {
                            User.setLoginErrorMessage("账号已在其他设备登录");
                            App.state.go('login',{insId:ms.insId});
                        }
                        Utils.appRetSet();
                        response.data = null;
                        return response;
                    }
                    if (response.data.code === 1514) {//还未报名,没有student信息
                        response.data.code = 200;
                        response.data.data = null;
                        return response;
                    }
                }
                return response;
            },
            requestError: function (config) {
                response.config.responseTimestamp = new Date().getTime();
                $rootScope.$broadcast('scroll.refreshComplete');
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                Utils.toast("连接失败,请检查网络");
                return config;
            },
            responseError: function (response) {
                $rootScope.$broadcast('scroll.refreshComplete');
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                response.config.responseTimestamp = new Date().getTime();
                if(response.config.url.indexOf(App.authUrl)==0){
                    Utils.toast("登录服务器没有响应");
                }else if(response.config.url.indexOf(App.baseUrl)==0){
                    Utils.toast("基础服务器没有响应");
                }else{
                    Utils.toast("服务器没有响应");
                }
                return response;
            }
        };
        return loading;
    });
