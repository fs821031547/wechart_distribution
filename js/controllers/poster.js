/**
 * Created by izzld on 2018/3/16.
 */
starter.controller('posterCtrl', function($scope,Utils,Conn,App) {
    var ms = this;
    ms.insId = App.stateParams.insId;
    ms.id = App.stateParams.id;
    ms.coachId = App.stateParams.coachId;

    ms.submit = function () {
        var reg = new RegExp('^1\\d{10}$', 'g');
        /*jshint -W041 */
        if (!ms.name) {
            Utils.toast("请输入姓名");
            return;
        }
        /*jshint -W041 */
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