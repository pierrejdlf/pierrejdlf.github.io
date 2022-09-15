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
    "$document",
    "$location",
    "$anchorScroll",
    "$timeout",
    "anchorSmoothScroll",
    "settings",
    function ($scope, $routeParams, $http, _, $document, $window, $anchorScroll, $timeout, anchorSmoothScroll, settings) {
  
    // $scope.$on('$locationChangeStart', function(ev) {
    //   ev.preventDefault();
    // });
    
    var IFRAMEGITHUBPROJECTS = "tellme|treeword|static|gifcomics|streetmap|zoomap|bangalore";

    console.log("SETTINGS:",settings);
    $scope.settings = settings;

    var tailor = {
      resizable: true,
      //debounce: true,
    };

    /////////////////////////////////// FOLLOWING STATE
    $scope.now = {
      a:-1,
      b:-1,
    };
    $scope.element = {
      a:null,
      b:null
    };
    /////////////////////////////////// GET TYPE
    $scope.elType = function(e) {
      if(e.img) return "img";
      else if(e.text) return "text";
      else if(e.redirect) return "redirect";
      else if(e.vimeo) return "vimeo";
      else if(e.iframe) return "iframe";
      else return "nc-type";
    };
    $scope.clickA = function(a,index) {
      if($scope.now.a == -1) {
        $scope.element.a = a;
        $scope.now.a = index;
        $scope.now.b = -1;
        ga('send','event','Cell_A', 'Opened', index+"_"+a.title); // hello to ga
      } else {
        ga('send','event','Cell_A', 'Closed', index+"_"+a.title); // hello to ga
        $scope.element.a = null;
        $scope.now.a = -1;
        $scope.now.b = -1;
      }
      $scope.log($scope.now);
    };
    $scope.clickB = function(a,aindex,b,bindex) {
      //console.log("was",$scope.now);
      var btype = $scope.elType(b);

      if($scope.now.b != bindex) {
        $scope.element.b = b;
        $scope.now.a = aindex;
        $scope.now.b = bindex;

        var st = "";
        st += btype=='img' ? b.img : "";
        st += btype=='iframe' ? b.iframe : "";
        st += btype=='vimeo' ? b.vimeo : "";
        ga('send','event','Cell_B', 'Opened', aindex+"_"+bindex+"_"+btype+"_"+st); // hello to ga

        //$location.hash('b_'+index);
        // $timeout(function() {
        //   anchorSmoothScroll.scrollTo('b_'+index,30,160);
        //   //$anchorScroll();
        // },500);
      } else {
        var st = "";
        st += btype=='img' ? b.img : "";
        st += btype=='iframe' ? b.iframe : "";
        st += btype=='vimeo' ? b.vimeo : "";
        ga('send','event','Cell_B', 'Closed', aindex+"_"+bindex+"_"+btype+"_"+st); // hello to ga
        $scope.element.b = null;
        $scope.now.b = -1;
      }
      $scope.log($scope.now);
    };

    $document.bind("keydown keypress", function(event) {
      //console.debug("key",event, event.which);
      if(event.which==27) { // ESC
        console.log("ESC");
        if($scope.now.b==-1) {
          $scope.element.a = null;
          $scope.now.a = -1;
        } else {
          $scope.element.b = null;
          $scope.now.b = -1;
        }
        $scope.$apply();
      }
      if(event.which==37) { // LEFT

      }
      if(event.which==39) { // RIGHT

      }
    });
    
    
    //////////////////////////////////////////
    $http
      .get("../media.yml")
      .success(function(res) {
        
        $scope.root = jsyaml.load(res);

      })
      .error(function (data, status, headers, config) {
        console.log("error loading json!");
      });

      $scope.log = function(e) {
        console.log(e);
      };

  }]);
  