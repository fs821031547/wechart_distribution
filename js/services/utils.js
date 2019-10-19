/**
 * Created by izzld on 2016-08-13.
 */
angular.module('starter')
  .factory('Utils', function (App, $timeout,User,$rootScope,$ionicPlatform) {
    return {
        toast: function (text) {
            if(!text){
                return;
            }
            var confirmPopup = {
                template:"<div>"+ text +"<div>",
                cssClass: "toast",
            };
            var myPopup = App.ionPopup.confirm(confirmPopup)
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1000);
        },
        confirm: function (title, content, cssClass,fun, cancel) {
            var confirmPopup = {
                title: '<strong>' + title + '</strong>',
                template: content,
                cssClass: cssClass,
                okText: '退出登录',
                cancelText: '取消',
            };
            var myPopup = App.ionPopup.confirm(confirmPopup).then(function (res) {
                if (res) {
                    fun();
                } else {
                    cancel();
                }
            });

        },
        //普通警告弹窗
        alert: function (title, content,cssClass) {
            var options = {
                title: '<strong>' + title + '</strong>',
                template: content,
                cssClass: cssClass,
                okText: '确定',
                okType: 'button-energized'
            };
            App.ionPopup.alert(options);
        },
        show : function (title,content,cssClass,scope,okText,Fn) {
            var isClose = false
            var myPopup = App.ionPopup.show({
                template: content,
                title: title,
                cssClass: cssClass,
                scope: scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>'+ okText +'</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            Fn();
                        }
                    },
                ]
            });
            document.addEventListener('click', function(){
                if($(".backdrop").hasClass("active")){
                    myPopup.close();
                }

            })
        },
        appRetSet: function () {
            User.removeToken();
        },
        //分页,ms.data数据列表,ms.canLoadMore是否有更多,ms.loadMore()加载更多方法
        paging: function (data,ms) {
            if(ms.pageIndex == 1){
                ms.data = data;
            }else if(!!data){
                ms.data = ms.data.concat(data);
            }
            ms.canLoadMore = !(!data || data.length < ms.pageSize);

            ms.loadMore = function () {
                if(ms.data.length < ms.pageSize || !ms.canLoadMore){
                    return
                }
                ms.pageIndex = parseInt(ms.data.length / ms.pageSize)+1;
                ms.getData();
            };
            return ms;
        },
        registerBackButtonAction:function (path,fun) {
            var ms = this;
            $ionicPlatform.registerBackButtonAction(function (e) {
                if ($rootScope.loading === true) {
                    $rootScope.loading = false;
                }
                if(App.location.path().indexOf(path)>=0){
                    //TODO:页面内自己处理
                    fun();
                }else {
                    $rootScope.topGoBack();
                }
                e.preventDefault();
                return false;
            },101);
        },
        goAlert:function (message,insId) {
            User.setErrorMessage(message);
            App.state.go("alert",{insId:insId});
        }
    }
  })
  .run(function (App,$rootScope) {
      //后退
      $rootScope.topGoBack = function (index) {
          if(index){
              window.history.go(0-index);
          }else{
              window.history.back();
          }
      };
  });
