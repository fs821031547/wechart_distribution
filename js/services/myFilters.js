var myFilters = angular.module('myFilters', []);

//预约管理,按日期分组
myFilters.filter('resevationData',function($filter){
    return function(data){
        var result = [];
        var dayArray = [];
        var childResult;
        var tmp;

        for(var i=0; i<data.length; i++){
            tmp = data[i].day;
            if(dayArray.indexOf(tmp) < 0 ){
                dayArray.push(tmp);
            }
        }
        for(var m=0; m<dayArray.length; m++){
            childResult = [];
            for(var j in data){
                if(dayArray[m] == data[j].day){
                    childResult.push(data[j]);
                }
            }
            result.push(childResult);
        }
        return result;
    }
});
//按日期分组
myFilters.filter('monthData',function($filter){
    return function(data){
        if(!data || data.length<=0){
            return;
        }
        var result = [];
        var dayArray = [];
        var childResult;
        var tmp;

        for(var i=0; i<data.length; i++){
            tmp = $filter('date')(new Date(data[i].createTime), 'yyyy-MM');
            if(dayArray.indexOf(tmp) < 0 ){
                dayArray.push(tmp);
            }
        }

        for(var m=0; m<dayArray.length; m++){
            childResult = {
                childResult:[]
            };
            for(var j in data){
                if(dayArray[m] == $filter('date')(new Date(data[j].createTime), 'yyyy-MM')){
                    childResult.childResult.push(data[j]);
                }
            }
            result.push(childResult);
        }
        return result;
    }
});