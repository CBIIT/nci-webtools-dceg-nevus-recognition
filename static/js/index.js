$(document).ready( function() {
  $('.app').on('click', '.blur', function() {
    $(this).blur();
  });
});

var app = angular.module('myApp', ['ngSanitize']);

app.controller('myCtrl', function($scope, $http, $timeout) {
  var pages=1, itemsperpage=6, numitems=0, search="";
  var filterFns = {
    by6: function(element) { return element.hasClass($scope.filterValue); },
    searchby6: function(element) { return search ? element.text().match(search) : true; }
  };
  var $container = $('.isotope');
  var basicFilter = function(trueFilter) {
    return function() {
      if (trueFilter($(this))) {
        if (numitems < itemsperpage*pages) {
          numitems++;
          return true;
        } else {
          $scope.showload = true;
        }
      }
    }
  };
  var isotopic = function(trueFilter) {
    trueFilter = typeof trueFilter === undefined ? function(element) { return true; } : trueFilter;
    $timeout(function() {
      $container.isotope({
        itemSelector: '.item',
        filter: basicFilter(trueFilter)
      });
    });
  }
  $scope.cases = data.cases;
  $scope.filters = data.filters;
  $scope.about = false;
  $scope.currentcase = {};
  $scope.currentimg = 0;
  $scope.currenttype = $scope.filters[0];
  $scope.filterValue = 'mole';
  $scope.home = false;
  $scope.searching = false;
  $scope.tool = true;
  $scope.ulinks = false;
  $scope.showbacktotop = false;
  $scope.showload = false;
  $scope.search = "";
  $scope.subgrouptype = null;
  $scope.backToTop = function() {
    $('body,html').animate({scrollTop:0}, 1000);
  }
  $scope.changePage = function() {
    $scope.about = false;
    $scope.home = false;
    $scope.tool = false;
    $scope.searching = false;
    $scope.ulinks = false;
  };
  $scope.clearsearch = function() {
    $timeout(function() {
      $scope.search = "";
      $('#filters button').first().click();
    });
  };
  $scope.getFilterByName = function(filterName) {
    for (var index = 0; index < $scope.filters.length; index++) {
      var filter = $scope.filters[index];
      if (filter.type == filterName) {
        return filter;
      }
    }
    return $scope.filters[0];
  }
  $scope.filterClick = function(filter, toplevel) {
    toplevel = typeof toplevel === undefined ? false : toplevel;
    $scope.changePage();
    $scope.tool = true;
    $scope.filterValue = filter.type;
    numitems = 0;
    pages = 1;
    $scope.showload = false;
    if (toplevel) {
      $scope.currenttype = filter;
      if (filter.subgroups) {
        $scope.subgrouptype = filter.subgroups[0];
      }
    } else {
      $scope.subgrouptype = filter;
    }
    $timeout(function() { isotopic(filterFns.by6); });
  }
  $scope.goabout = function() {
    $scope.changePage();
    $scope.about = true;
  };
  $scope.gohome = function() {
    $scope.changePage();
    $scope.home = true;
  };
  $scope.gotool = function() {
    $scope.changePage();
    $scope.tool = true;
  };
  $scope.goulinks = function() {
    $scope.changePage();
    $scope.ulinks = true;
  };
  $scope.loadMore = function() {
    pages++;
    $scope.showload = false;
    numitems = 0;
    isotopic($scope.tool?filterFns.by6:filterFns.searchby6);
  }
  $scope.scrollLeft = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()-$('.images').width()}, 300);
  }
  $scope.scrollRight = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()+$('.images').width()}, 300);
  }
  $scope.searchingfunc = function() {
    if ($scope.search == undefined) {
      return $scope.clearsearch();
    }
    $scope.currenttype = null;
    $scope.changePage();
    $scope.searching = true;
    search = new RegExp( $scope.search, 'gi' );
    numitems = 0;
    pages = 1;
    $scope.showload = false;
    $timeout(function() {
      isotopic(filterFns.searchby6);
    });
  }
  $scope.update = function(index) {
    $scope.currentcase=index;
    $scope.currentimg=0;
  };
  $scope.updatecurrentimg = function(index) {
    $scope.currentimg=index;
    $('.images img').removeClass('active');
    index++;
    $('.images img:nth-child('+index+')').addClass('active');
    $('.spinnerbox').addClass('spinner-show');
  };
  $(window).scroll(function() {
    $scope.$apply(function() {
      $scope.showbacktotop = $(window).scrollTop() > 500;
    });
  });
  $(document).ready( function() {
    isotopic(filterFns.by6);
  });
});

app.directive('imageOnLoad', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('load', function() {
        // Set visibility: true + remove spinner overlay
        $('.spinnerbox').removeClass('spinner-show');
      });
      scope.$watch('ngSrc', function() {
      });
      }
    };
});

app.directive('carouselDir', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      $('.images button:nth-child(1)').addClass('active');
      var imgwidth = $('.images img').length * 114;
      if (imgwidth > 758 || imgwidth > $(window).width()) {
        $('.leftarrow').show();
        $('.rightarrow').show();
        $('.images').css('padding', '8px 50px');
      } else {
        $('.leftarrow').hide();
        $('.rightarrow').hide();
        $('.images').css('padding', '8px');
      }
      $( window ).resize(function() {
        if (imgwidth > 758 || imgwidth > $(window).width()) {
          $('.leftarrow').show();
          $('.rightarrow').show();
          $('.images').css('padding', '8px 50px');
        } else {
          $('.leftarrow').hide();
          $('.rightarrow').hide();
          $('.images').css('padding', '8px');
        }
      });
    }
  };
});