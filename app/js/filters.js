'use strict';

/* Filters */

angular.module('jdlf.filters', [])
  
  .filter('arrimgfy', function() {
    return function(str) {
      return str.trim().split(/\n/g);
    }
  })

  .filter('allowvimeo', function($sce) {
    return function(url) {
      var vid = url.match(/[0-9]+/)[0];
      return $sce.trustAsResourceUrl("//player.vimeo.com/video/"+vid);
    }
  })

  .filter('allowurl', function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    }
  })

  .filter('adjoin', function() {
    return function(list,max) {
      return list.join(", ");
    }
  });