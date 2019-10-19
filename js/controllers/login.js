

starter.controller('LoginCtrl', function($scope,Utils,App,Conn,User) {
    var ms = this;
    ms.id = App.stateParams.id;
    ms.insId = App.stateParams.insId;
    ms.paracont = "获取验证码";

    $scope.$on('$ionicView.beforeEnter', function () {
        if(!ms.insId){
            Utils.toast("驾校错误");
            return;
        }
        if(User.getToken()){
            window.location.replace(App.location.absUrl().replace("login","person"));
            return;
        }
        var error_message = User.getLoginErrorMessage();
        if(error_message){
            User.removeLoginErrorMessage();
            Utils.toast(error_message);
        }
        ms.info = {
            mobile: User.getMobile()
        };
        Utils.appRetSet();
    });

    ms.login = function () {
        if (!ms.info.code) {
            Utils.toast("请输入验证码");
            return;
        }
        ms.reg = /^1[0-9]{10}$/;
        if (ms.info.mobile.match(ms.reg) === null) {
            Utils.toast("请输入正确的手机号");
            return;
        }
        var param = {
            mobile: ms.info.mobile,
            identCode: ms.info.code,
            insId:ms.insId,
            app: App.app
        };
        Conn.postAuth("/wxlogin/login", param).then(function (res) {
            if (res.code === 200) {
                Utils.appRetSet();
                User.setToken(res.data);
                User.setMobile(param.mobile);
                ms.getData();
            } else {
                Utils.toast(res.message);
                
            }
        });
    };

    ms.getData = function () {
        var param = {
            token:User.getToken()
        };
        Conn.post("/user/detail",param).then(function (res) {
            if(res.code == 200){
                User.setChannelId(res.data.id);
                window.location.replace(App.location.absUrl().replace("login","person"));
                App.interval.cancel(timePromise);
                timePromise = undefined;
                second = 60;
                ms.paracont = "获取验证码";
                ms.paraclass = "button-energized";
            }else{
                User.removeToken();
                Utils.toast(res.message);
            }
        },function () {
            User.removeToken();
        })
    };

    ms.verify = function () {
        ms.reg = /^1[0-9]{10}$/;
        if (ms.paraclass === "custom-button-gray") {
            return;
        }
        if (ms.info.mobile.match(ms.reg) === null) {
            Utils.toast("请输入正确的手机号");
            return;
        }
        ms.paraclass = "custom-button-gray";
        var param = {
            mobile: ms.info.mobile
        };
        Conn.postAuth("/wxlogin/identifyingCode", param).then(function (res) {
            if (res.code === 200) {
                Utils.toast("验证码发送成功");
                //Toast通知已发送验证码,按钮60s后才可再点击
                var second = 60;
                timePromise = App.interval(function () {
                    if (second <= 0) {
                        App.interval.cancel(timePromise);
                        timePromise = undefined;
                        second = 60;
                        ms.paracont = "重发验证码";
                        ms.paraclass = "button-energized";
                    } else {
                        ms.paracont = second + "秒后可重发";
                        ms.paraclass = "custom-button-gray";
                        second--;
                    }
                }, 1000, 100);
            } else {
                ms.paracont = "获取验证码";
                ms.paraclass = "button-energized";
                Utils.toast(res.message);
            }
        }, function (res) {
            ms.paracont = "获取验证码";
            ms.paraclass = "button-energized";
        });
    };
});