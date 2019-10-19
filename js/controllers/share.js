/**
 * Created by izzld on 2018/3/16.
 */

starter.controller('shareCtrl', function($scope,Utils,Conn,App,User) {
    var ms = this;
    ms.id = App.stateParams.id;
    ms.type = App.stateParams.type;
    ms.insId = App.stateParams.insId;

    $scope.$on('$ionicView.beforeEnter', function () {
        if (!ms.id) {
            Utils.toast("渠道信息错误,请重新进入!");
            return;
        }
        ms.getTheme();
        ms.getData();
    });

    $scope.$on('$ionicView.enter', function () {
        ms.user = null;
        ms.canSend = true;
        ms.paracont = "获取验证码";
    });

    ms.getTheme = function () {
        var param = {
            insId:ms.insId
        };
        Conn.get("/theme/getDefaultTheme",param).then(function (res) {
            if(res.code == 200){
                ms.theme = res.data;
                if(ms.theme.imageUrlS){
                    ms.style = {"background":"url("+ms.theme.imageUrlS+") top center no-repeat","background-size":"100%"}
                }else{
                    ms.style = {"background":"url(img/application/app1.jpg) top center no-repeat","background-size":"100%"}
                }
            }else{
                Utils.toast(res.message);
            }
        })
    };

    ms.getData = function () {
        var param = {
            id:ms.id
        };
        Conn.get("/order/getChannelInfo",param).then(function (res) {
            if(res.code == 200){
                ms.data = res.data
            }else{
                Utils.toast(res.message);
            }
        })
    };

    ms.sendCode = function () {
        if (ms.canSend === false) {
            return;
        }
        ms.reg = /^1[0-9]{10}$/;
        if (!ms.user.mobile || ms.user.mobile.match(ms.reg) === null) {
            Utils.toast("请输入正确的手机号");
            return;
        }
        var param = {
            id:ms.id,
            mobile:ms.user.mobile
        };
        Conn.post("/order/sendCode",param).then(function (res) {
            if (res.code === 200) {
                Utils.toast("验证码发送成功");
                //Toast通知已发送验证码,按钮60s后才可再点击
                var second = 60;
                ms.timePromise = App.interval(function () {
                    if (second <= 0) {
                        App.interval.cancel(ms.timePromise);
                        ms.timePromise = undefined;
                        second = 60;
                        ms.paracont = "重发验证码";
                        ms.canSend = true;
                    } else {
                        ms.paracont = second + "秒后可重发";
                        ms.canSend = false;
                        second--;
                    }
                }, 1000, 100);
            } else {
                ms.paracont = "获取验证码";
                ms.canSend = true;
                Utils.toast(res.message);
            }
        }, function (res) {
            ms.paracont = "获取验证码";
            ms.canSend = true;
        })
    };

    ms.submit = function () {
        if(!ms.data){
            Utils.toast("渠道错误或者已被关闭,请重新扫码进入");
            return;
        }
        ms.reg = /^1[0-9]{10}$/;
        if (!ms.user.mobile || ms.user.mobile.match(ms.reg) === null) {
            Utils.toast("请输入正确的手机号");
            return;
        }
        if (!ms.user.name) {
            Utils.toast("请输入姓名");
            return;
        }
        if (ms.data.wxCodeSwitch===1 && !ms.user.code) {
            Utils.toast("请输入验证码");
            return;
        }
        if(!ms.id){
            Utils.toast("渠道信息错误,请重新进入!");
            return;
        }
        var param = {
            name:ms.user.name,
            mobile:ms.user.mobile,
            code:ms.user.code,
            channelId:ms.id,
            type:ms.type
        };
        Conn.post("/order/addOrder",param).then(function (res) {
            if(res.code == 200){
                ms.user = null;
                Utils.goAlert('<p class="pt0"><img src="img/yes.png"></p><p class="pt1">提交成功</p><p class="pt2">稍后会有客服人员与您联系！</p>',ms.insId);
                if(ms.timePromise){
                    App.interval.cancel(ms.timePromise);
                }
            }else{
                Utils.alert(res.message);
            }
        })
    };
    
    var focus = false;
    $("input").focus(function(){
        focus = true;
    });
    $("input").blur(function(){
        focus = false;
        setTimeout(function(){
            if(!focus){
                window.scrollTo(0, 0)
            }
        },100)
    });
});