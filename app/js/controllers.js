'use strict';

/* Controllers */

angular.module('underscore', [])

  .factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
  });


angular.module('jdlf.controllers', ['underscore'])

  .controller('jdlfCtrl', [
    "$scope",
    "$routeParams",
    "$http",
    "_",
    function ($scope, $routeParams, $http, _) {
    
    $scope.title = "Hello";
    $scope.basemedia = "http://jdlf.info/p/media/";

    var url = "http://localhost/pierrejdlf.github.io/app/miniProxy.php/https://gingkoapp.com/farfouille.json";
    //var url = 'data/data.json';

    var extractRegexp = function(d,key,r,split) {
      var regexp = new RegExp(r);
      if(regexp.test(d.content)) {
        
        // if(split) { // either we split all the matches into an array
        //   var globregexp = new RegExp(r,'g');
        //   var mat = d.content.match(globregexp);
        //   d[key] = [];
        //   d.type = key;
        //   _.each(mat, function(k) {
        //     if(d.type=='gallery')
        //       k = k.replace(/^!\[]\(/,"").replace(/\)$/,"");
        //     d[key].push(k);
        //   });
        // } else { // either we just extract the regexp
          var mat = d.content.match(regexp);
          if(mat.length>1) {
            d[key] = mat[1];
            d.type = key;
            //console.log("extracted!",d);
          }
          d.content = d.content.replace(regexp,"");
        //}
      }
      return d;
    };
    //////////////////////////////////////////
    $scope.recursiveYam = function(list) {
      _.each(list, function(d,k) {
        // do it for all children
        if(d.children) {
          $scope.recursiveYam(d.children);
        }
        // parse content
        if(d.content) {
          // warning: double escape needed as we will treat strings as regexp
          extractRegexp(d,'title','^#([^\\n]*)\\n');
          extractRegexp(d,'subtitle','^##([^\\n]*)\\n');
          extractRegexp(d,'img','^!\\[\\w*]\\(([^\\n\\)]*)\\)\\n*');
          extractRegexp(d,'vimeo','^(https*://vimeo.com.+)\\n*');
          extractRegexp(d,'iframe','^(https*://pierrejdlf.github.io/(tellme|treeword|static)[^\\n]*)\\n*');
          extractRegexp(d,'redirect','^(https*://[^\\n]+)\\n*');
          //extractRegexp(d,'gallery','!\\[\\w*]\\(([^\\n\\)]*)\\)',true);
          extractRegexp(d,'text','^---\\n((.|\\n)+)');
        }
      });
    };

    var removeEmpties = function(list) {
      return _.filter(list, function(d) {
        return d.content;
      });
    };
    //////////////////////////////////////////
    $http
      .get(url)
      .success(function(res) {
        console.log("json data:",res);
 
        // remove empty ones
        var root = res.slice(1)[0]; //omit first element (info)
        console.log("Will parse.");
        $scope.recursiveYam([root]);
        console.log("yamled data:",root);
        $scope.root = root;
      })
      .error(function (data, status, headers, config) {
        console.log("error loading json!");
      });

      $scope.log = function(e) {
        console.log(e);
      };

  }]);
  