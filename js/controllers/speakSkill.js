/**
 * Created by izzld on 2018/3/16.
 */
starter.controller('speakSkillCtrl', function($scope,Utils,Conn,App) {
    var ms = this;
    ms.id = App.stateParams.id;
    ms.coachId = App.stateParams.coachId;

    $scope.$on('$ionicView.enter', function () {
        ms.doRefresh();
    });

    ms.doRefresh = function () {
        ms.showModel = false;
        var param = {
            id:ms.id
        };
        //获取教练信息
        Conn.getStudent("/coach/detail/"+ms.coachId, param).then(function (res) {
            if (res.code === 200) {
                ms.coach = res.data;
                //获取模板信息
                Conn.getCoach("/speakSkill/getOne", param).then(function (res) {
                    if (res.code === 200) {
                        ms.data = res.data;
                        if(ms.data.img){
                            ms.data.imgList = ms.data.img.split("|");
                        }
                        ms.data.content = ms.data.content.replace("{1}",ms.coach.mobile);
                    } else {
                        Utils.toast(res.message);
                    }
                });
            } else {
                Utils.toast(res.message);
            }
        });
    };

    ms.show = function () {
        ms.showModel = !ms.showModel;
    };

    ms.submit = function () {
        var reg = new RegExp('^1\\d{10}$', 'g');
        if (!ms.name) {
            Utils.toast("请输入姓名");
            return;
        }
        if (!reg.test(ms.mobile)) {
            Utils.toast("请输入正确的手机号");
            return;
        }
        var param = {
            posterId:ms.id,
            coachId:ms.coachId,
            name:ms.name,
            mobile:ms.mobile
        };
        Conn.postCoach("/poster/submitIntent",param).then(function (res) {
            if(res.code == 200){
                ms.name = null;
                ms.mobile = null;
                var title = "温馨提示";
                var content = "<div><div>提交完成</div><div>24小时会有客服人员与你联系,为你提供全程服务</div></div>";
                var okText = "关闭";
                Utils.show(title,content,"app-confirm app-show",$scope,okText);
            }else{
                Utils.toast(res.message);
            }
        })

    };
});