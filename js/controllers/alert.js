/**
 * Created by zeng on 2016/8/18.
 * 学员协议
 */
starter.controller("AlertCtrl", function ($scope,App,User) {
    var ms = this;
    ms.insId = App.stateParams.insId;
    $scope.$on('$ionicView.enter', function () {
        var errorMessage = User.getErrorMessage();
        if(!errorMessage){
            ms.error = "404页面";
        }else{
            ms.error = errorMessage;
        }
    });
});
