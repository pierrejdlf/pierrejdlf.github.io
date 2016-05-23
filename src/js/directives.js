'use strict';

/* Directives */

angular.module('jdlf.directives', [])
  
  .directive('backImg', function() {
    return function(scope, element, attrs){
      var url = attrs.backImg;
      element.css({
        'background-image': 'url(' + url +')',
      });
    };
  })

  // will add a target blank to open ALL links having href in a new tab
  .directive('href', function() {
    return {
      compile: function(element) {
        element.attr('target', '_blank');
      }
    };
  })

