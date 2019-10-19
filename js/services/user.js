/**
 * Created by izzld on 2016-08-15.
 * 学员信息保存
 */
angular.module('starter')
    .factory('User', function ($rootScope) {
        var setItem = function (item, value) {
            // console.log("set"+item);
            /*jshint -W041 */
            if (value === null || value === undefined) {
                return;
            }
            localStorage.setItem($rootScope.insId+item, value);
        };
        var removeItem = function (item) {
            // console.log("remove"+item);
            localStorage.removeItem($rootScope.insId+item);
        };
        var getItem = function (item) {
            // console.log("get"+item);
            var value = localStorage.getItem($rootScope.insId+item);
            /*jshint -W041 */
            if (value !== null && value !== undefined && value !== "" && value !== "null") {
                return value;
            } else {
                return null;
            }
        };
        var getItemNum = function (item) {
            var value = localStorage.getItem($rootScope.insId+item);
            /*jshint -W041 */
            if (value !== null && value !== undefined && value !== "" && value !== "null") {
                return parseInt(value);
            } else {
                return 0;
            }
        };

        return {
            //token
            getToken: function () {
                return getItem("token");
            },
            setToken: function (token) {
                setItem("token", token);
            },
            removeToken: function () {
                removeItem("token");
            },

            getMobile: function () {
                return getItem("mobile");
            },
            setMobile: function (mobile) {
                setItem("mobile", mobile);
            },
            //登录页面错误消息
            removeLoginErrorMessage: function(){
                removeItem('login_error_message');
            },
            getLoginErrorMessage: function(){
                return getItem('login_error_message');
            },
            setLoginErrorMessage: function(login_error_message){
                setItem('login_error_message',login_error_message);
            },
            getInsId: function(){
                return getItem('insId');
            },
            setInsId: function(insId){
                setItem('insId',insId);
            },
            getChannelId: function(){
                return getItem('channelId');
            },
            setChannelId: function(channelId){
                setItem('channelId',channelId);
            },
            getErrorMessage: function(){
                return getItem('errorMessage');
            },
            setErrorMessage: function(errorMessage){
                setItem('errorMessage',errorMessage);
            },

        };
    });