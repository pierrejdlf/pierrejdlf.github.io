'use strict';

/* Controllers */

angular.module('underscore', [])

  .factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
  });


angular.module('jdlf.controllers', ['underscore','config'])

  .controller('jdlfCtrl', [
    "$scope",
    "$routeParams",
    "$http",
    "_",
    "$location",
    "$anchorScroll",
    "$timeout",
    "anchorSmoothScroll",
    "settings",
    function ($scope, $routeParams, $http, _, $location, $anchorScroll, $timeout, anchorSmoothScroll, settings) {
  
    // $scope.$on('$locationChangeStart', function(ev) {
    //   ev.preventDefault();
    // });
    



    console.log("SETTINGS:",settings);
    var LOCAL = settings.fetchlocal;
    var proxyurl = "http://localhost/pierrejdlf.github.io/app/miniProxy.php/https://gingkoapp.com/4xcx2x.json";
    var localurl = 'data/contents.json';
    var IFRAMEGITHUBPROJECTS = "tellme|treeword|static|gifcomics|streetmap|zoomap|bangalore";



    /////////////////////////////////// FOLLOWING STATE
    $scope.now = {
      a:-1,
      b:-1,
    };
    $scope.clickA = function(a,index) {
      if($scope.now.a != index) {
        $scope.now.a = index;
        $scope.now.b = -1;
      } else {
        $scope.now.a = -1;
        $scope.now.b = -1;
      }
      $scope.log($scope.now);
    };
    $scope.clickB = function(a,aindex,b,bindex) {
      if($scope.now.b != bindex) {
        $scope.now.a = aindex;
        $scope.now.b = bindex;
        //$location.hash('b_'+index);
        // $timeout(function() {
        //   anchorSmoothScroll.scrollTo('b_'+index,30,160);
        //   //$anchorScroll();
        // },500);
      } else {
        $scope.now.b = -1;
      }
      $scope.log($scope.now);
    };
    




    var getPrepairedData = function(json) {
      //////////////////////////////////////////////////////////////////////
      var removeEmpties = function(list) {
        return _.filter(list, function(d) {
          return d.content;
        });
      };
      var extractRegexp = function(d,key,r,split) {
        var regexp = new RegExp(r);
        if(regexp.test(d.content)) {
            var mat = d.content.match(regexp);
            if(mat.length>1) {
              d[key] = mat[1];
              d.type = key;
            }
            d.content = d.content.replace(regexp,"");
        }
        return d;
      };
      var recursiveYam = function(list) {
        _.each(list, function(d,k) {
          // do it for all children
          if(d.children) {
            d.children = removeEmpties(d.children);
            recursiveYam(d.children);
          }
          // parse content
          if(d.content) {
            // warning: double escape needed as we will treat strings as regexp
            extractRegexp(d,'title','^#([^\\n]*)\\n');
            extractRegexp(d,'subtitle','^##([^\\n]*)\\n');
            extractRegexp(d,'img','^!\\[\\w*]\\(([^\\n\\)]*)\\)\\n*');
            extractRegexp(d,'vimeo','^(https*://vimeo.com.+)\\n*');
            extractRegexp(d,'iframe','^(https*://pierrejdlf.github.io/('+IFRAMEGITHUBPROJECTS+')[^\\n]*)\\n*');
            extractRegexp(d,'redirect','^(https*://[^\\n]+)\\n*');
            extractRegexp(d,'text','^---\\n((.|\\n)+)');
          }
        });
      };
      //////////////////////////////////////////////////////////////////////

      // remove empty ones
      var root = json.slice(1)[0]; //omit first element (info)
      recursiveYam([root]);
      return root;
    }






    
    //////////////////////////////////////////
    $http
      .get(LOCAL ? localurl : proxyurl)
      .success(function(res) {
        
        $scope.root = LOCAL ? res : getPrepairedData(res);

      })
      .error(function (data, status, headers, config) {
        console.log("error loading json!");
      });

      $scope.log = function(e) {
        console.log(e);
      };

  }]);
  