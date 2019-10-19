/**
 * Created by izzld on 2018/3/8.
 */
angular.module('starter')

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            // Each tab has its own nav history stack:
        //TODO:注意注意,这里手动根据驾校区分所有页面及存储数据, 所有页面都要加上insId,
        //TODO:localStorage根据$rootScope.insId(在app.js页面跳转时写入)获取数据,
        //TODO:切记不能使用清除所有localStorage的方法
            .state('person', {
                url: '/person/:insId',
                templateUrl: 'templates/tab-person.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'PersonCtrl as ms'
            })
            //个人中心
            .state('login', {
                url: '/login/:insId',
                templateUrl: 'templates/tab-login.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'LoginCtrl as ms'
            })
            //历史订单
            .state('historyrecord', {
                url: '/historyrecord/:insId',
                templateUrl: 'templates/tab-historyrecord.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'HistoryRecordCtrl as ms'
            })
            //订单详情
            .state('orderDetails', {
                url: '/orderDetails/:insId/:id',
                templateUrl: 'templates/tab-orderDetails.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'OrderDetailsCtrl as ms'
            })
            //预约列表
            .state('dealOrder', {
                url: '/dealOrder/:insId',
                templateUrl: 'templates/tab-dealOrder.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'DealOrderCtrl as ms'
            })
            //分享页面
            .state('share', {
                url: '/share/:id/:type/:insId',
                templateUrl: 'templates/tab-share.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'shareCtrl as ms'
            })
            //注册
            .state('register', {
                url: '/register/:insId',
                templateUrl: 'templates/tab-register.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'registerCtrl as ms'
            })
            //我的钱包
            .state('myWallet', {
                url: '/myWallet/:insId',
                templateUrl: 'templates/tab-myWallet.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'myWalletCtrl as ms'
            })
            // 银行卡
            .state('bankCard', {
                url: '/bankCard/:insId',
                templateUrl: 'templates/tab-bankCard.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'bankCardCtrl as ms'
            })
            // 新增银行卡
            .state('addBankCard', {
                url: '/addBankCard/:insId',
                templateUrl: 'templates/tab-addBankCard.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'addBankCardCtrl as ms'
            })
            //余额
            .state('balance', {
                url: '/balance/:insId',
                templateUrl: 'templates/tab-balance.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'balanceCtrl as ms'
            })
            //提现
            .state('withdraw', {
                url: '/withdraw/:insId',
                templateUrl: 'templates/tab-withdraw.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'withdrawCtrl as ms'
            })
            //注册协议
            .state('protocol', {
                url: '/protocol/:insId',
                templateUrl: 'templates/tab-protocol.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'ProtocolCtrl as ms'
            })
            //错误页面
            .state('alert', {
                url: '/alert/:insId',
                templateUrl: 'templates/tab-alert.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'AlertCtrl as ms'
            })

            //其他项目分享出来的独立页面
            // TODO:在app.js中写入例外
            //教练端海报分享页面
            .state('poster', {
                url: '/poster/:id/:coachId',
                templateUrl: 'templates/tab-poster.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'posterCtrl as ms'
            })
            //教练端招生话术分享页面
            .state('speakSkill', {
                url: '/speakSkill/:id/:coachId',
                templateUrl: 'templates/tab-speakSkill.html?t=' + Math.floor(Date.now() / 1000),
                controller: 'speakSkillCtrl as ms'
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login/');

    });
