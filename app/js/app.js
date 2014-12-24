'use strict';

/* App */

angular.module('jdlf', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'angular-markdown',
  'jdlf.directives',
  'jdlf.filters',
  'jdlf.controllers'
])
  
  // .factory("settings", function(){
  //   return {
  //     sharedinfo: "nothing"
  //   };
  // })

  .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    
    // $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
      templateUrl: 'partials/layout.html',
      controller: 'jdlfCtrl'
      // reloadOnSearch: false
    });

    $routeProvider.otherwise({
      redirectTo: '/fr/'
    });

  }]);
