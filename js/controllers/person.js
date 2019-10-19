starter.controller('PersonCtrl', function($scope,Utils,App,Conn,User,$location) {
    var ms = this;
    ms.insId = App.stateParams.insId;
    ms.qrcode  =128;
    ms.qrcodePadding = 5;
    ms.qrcodeLogo = "img/qrcodelogo.png";
    ms.qrcodeLogoSize = 36;

    $scope.$on('$ionicView.loaded', function () {
        ms.id = User.getChannelId();
        ms.perid = User.getChannelId();
        if(!ms.id){
            Utils.toast("渠道id错误,请重新登录!");
            return;
        }
        ms.draw();
    });

    $scope.$on('$ionicView.beforeEnter', function () {
        ms.id = User.getChannelId();
        if(!ms.id){
            Utils.toast("渠道id错误,请重新登录!");
            return;
        }
        if(ms.perid != ms.id){
            ms.draw();
        }
    });

    ms.signOut = function () {
        var title = User.getMobile();
        var content = "";
        var okText = "退出登录";
        Utils.show(title,content,'confirm',$scope,okText,function () {
            Utils.appRetSet();
            App.state.go("login",{insId:ms.insId});
        });
    };

    ms.draw = function () {
        if(!ms.id){
            return;
        }
        ms.perid = ms.id;
        ms.url = $location.absUrl();
        ms.url = ms.url.replace("person","share/"+ms.id+"/2");
        console.log(ms.url);
        var drawing = document.getElementById("drawing");
        drawing.width	= ms.qrcode+ms.qrcodePadding*2;
        drawing.height	= ms.qrcode+ms.qrcodePadding*2;
        //确定浏览器支持<canvas>元素
        if (drawing.getContext) {
            //取得绘图上下文对象的引用，“2d”是取得2D上下文对象
            var context = drawing.getContext("2d");
            //画二维码
            var options	= $.extend( {}, {
                text:       ms.url,
                render		: "canvas",
                width		: ms.qrcode,
                height		: ms.qrcode,
                typeNumber	: -1,
                correctLevel	: QRErrorCorrectLevel.H,
                background      : "#ffffff",
                foreground      : "#000000"
            }, options);

            //白色背景
            context.fillStyle = "#ffffff";
            context.fillRect(0,0, options.width+ms.qrcodePadding*2, options.width+ms.qrcodePadding*2);

            // create the qrcode itself
            var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // compute tileW/tileH based on options.width/options.height
            var tileW	= options.width  / qrcode.getModuleCount();
            var tileH	= options.height / qrcode.getModuleCount();

            // draw in the canvas
            for( var row = 0; row < qrcode.getModuleCount(); row++ ){
                for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                    context.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                    var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                    var h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH));
                    context.fillRect(Math.round(col*tileW)+ms.qrcodePadding,Math.round(row*tileH)+ms.qrcodePadding, w, h);
                }
            }
            ms.imgURI = drawing.toDataURL("image/jpeg");
        }
    }
});