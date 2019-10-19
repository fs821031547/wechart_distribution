starter.controller('registerCtrl', function(Utils,User,Conn,App) {
    var ms = this;
    ms.insId = App.stateParams.insId;
    ms.user = {};
    
    ms.submit = function () {
        if(!ms.insId){
            Utils.toast("驾校渠道id不正确,请重新进入!");
            return;
        }
        ms.reg = /^1[0-9]{10}$/;
        if (!ms.user.mobile || ms.user.mobile.match(ms.reg) === null) {
            Utils.toast("请输入正确的手机号");
            return;
        }
        if (!ms.user.name||!ms.user.shopName||!ms.user.shopAddress) {
            Utils.toast("参数不能为空");
            return;
        }
        var param = {
            contacts:ms.user.name,
            contactsPhone:ms.user.mobile,
            name:ms.user.shopName,
            contactsAddress:ms.user.shopAddress,
            insId:ms.insId
        };
        Conn.postAuth("/wxlogin/register",param).then(function (res) {
            if(res.code == 200){
                Utils.toast("申请成功,请等待审核通过!");
            }else{
                Utils.toast(res.message);
            }
        })
    }

})