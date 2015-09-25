var app = angular.module('nevusAdmin', ['ngSanitize']);

app.controller('nevusDataAdmin', function($scope, $http, $timeout) {
  var filterFns = {
    by6: function(element) { return element.hasClass($scope.filterValue); }
  };
  var $container = $('.isotope');
  var basicFilter = function(trueFilter) {
    return function() {
      if (trueFilter($(this))) {
        return true;
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
  $scope.currentcase = {};
  $scope.currentimg = 0;
  $scope.currenttype = $scope.filters[0];
  $scope.filterValue = '';
  $scope.showbacktotop = false;
  $scope.subgrouptype = null;
  $scope.backToTop = function() {
    $('body,html').animate({scrollTop:0}, 1000);
  }
  $scope.filterClick = function(filter, subgroup) {
    $scope.filterValue = filter.type;
    $scope.currenttype = filter;
    if (subgroup !== undefined) {
      $scope.filterValue = subgroup.type;
      $scope.subgrouptype = subgroup;
    } else if (filter.subgroups) {
      $scope.filterValue = filter.subgroups[0].type;
      $scope.subgrouptype = filter.subgroups[0];
    }
    isotopic(filterFns.by6);
  }
  $scope.scrollLeft = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()-$('.images').width()}, 300);
  }
  $scope.scrollRight = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()+$('.images').width()}, 300);
  }
  $scope.update = function(caseObject,index) {
    $scope.currentcase=caseObject;
    $scope.updatecurrentimg(0);
  };
  $scope.updatecurrentimg = function(index) {
    $scope.currentimg=index;
    index++;
    $('.spinnerbox').addClass('spinner-show');
  };
  $(window).scroll(function() {
    $scope.$apply(function() {
      $scope.showbacktotop = $(window).scrollTop() > 500;
    });
  });
  $(window).load(function() {
    $scope.$apply($scope.filterClick($scope.filters[0]));
  })
});

app.directive('bindCompiledHtml', function($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) { return scope.$eval(attrs.bindCompiledHtml); },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope)
      }
    )
  }
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