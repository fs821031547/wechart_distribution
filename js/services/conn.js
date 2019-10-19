/**
 * Created by izzld on 2016-08-12.
 */
angular.module('starter')
  .factory('Conn', function (App) {
    var authUrl = App.authUrl;

    async = true; // 异步访问

    //格式化post参数
    var formatPost = function (obj) {
      if (obj === null || obj === undefined) {
        return
      }
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += formatPost(innerObj) + '&';
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += formatPost(innerObj) + '&';
          }
        }
        else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
      return query.length ? query.substr(0, query.length - 1) : query;
    };

    //格式化get参数
    var formatGet = function (obj) {
      if (obj === null || obj === undefined) {
        return ""
      }
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '?' + i;
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += formatGet(innerObj) + '&';
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '?' + subName;
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += formatGet(innerObj) + '&';
          }
        }
        else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
      var res = query.length ? query.substr(0, query.length - 1) : query;

      if (res === null || res === undefined || res === "") {
        return "";
      } else {
        return "?" + res;
      }
    };

    function methodGet(base, url, param) {
      var defer = App.q.defer();
      App.http({
        url: base + url + formatGet(param),
        method: "GET",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 20000
      }).success(function (data) {
        defer.resolve(data);
      }).error(function (err) {
        defer.reject(err);
      });
      return defer.promise;
    }

    function methodPost(base, url, param , async) {
      var defer = App.q.defer();
      App.http({
        url: base + url,
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        async: async,
        data: formatPost  (param),
        timeout: 20000
      }).success(function (data) {
        defer.resolve(data);
      }).error(function (err) {
        defer.reject(err);
      });
      return defer.promise;
    }

    return {
        get: function (url, param) {
            return methodGet(App.baseUrl, url, param);
        },
        post: function (url, param) {
            return methodPost(App.baseUrl, url, param);
        },
        getCoach: function (url, param) {
            return methodGet(App.coachUrl, url, param);
        },
        postCoach: function (url, param) {
            return methodPost(App.coachUrl, url, param);
        },
        getAuth: function (url, param) {
            return methodGet(authUrl, url, param);
        },
        postAuth: function (url, param) {
            return methodPost(authUrl, url, param);
        },
        getStudent: function (url, param) {
          return methodGet(App.studentUrl, url, param);
      },
    };
  });
