var app = angular.module('nevusAdmin', ['ngSanitize']);

app.controller('nevusDataAdmin', function($scope, $compile, $http, $timeout) {
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
  $scope.allFilters = [];
  for (var index in $scope.filters) {
    var filter = $scope.filters[index];
    $scope.allFilters.push(filter.type);
    if (filter.subgroups) {
      for (var subIndex in filter.subgroups) {
        var subgroup = filter.subgroups[subIndex];
        $scope.allFilters.push(subgroup.type);
      }
    }
  }
  $scope.currentcase = {};
  $scope.currentimg = 0;
  $scope.currenttype = $scope.filters[0];
  $scope.filterValue = '';
  $scope.showbacktotop = false;
  $scope.subgrouptype = null;
  $scope.backToTop = function() {
    $('body,html').animate({scrollTop:0}, 1000);
  }
  $scope.createNew = function() {
    var newCase = {};
    newCase.type = $scope.currenttype.type;
    if ($scope.subgrouptype) {
      newCase.subgroup = $scope.subgrouptype.type;
    }
    $scope.cases.push(newCase);
    $scope.update(newCase);
    $timeout(function() {
      $container.isotope('appended',$container.children().last().prev());
      var newCaseButton = $container.children().last().prop('outerHTML');
      $container.isotope('remove',$container.children().last());
      $container.isotope('insert',$(newCaseButton));
      $compile($container.children().last())($scope);
    });
  }
  $scope.getFilterByName = function(filterName) {
    for (var index = 0; index < $scope.filters.length; index++) {
      var filter = $scope.filters[index];
      if (filter.type == filterName) {
        return filter;
      }
    }
    return $scope.filters[0];
  }
  $scope.getSubgroupByName = function(filter,subgroupName) {
    var subgroups = filter.subgroups;
    for (var index = 0; index < subgroups.length; index++) {
      var subgroup = subgroups[index];
      if (subgroup.type == subgroupName) {
        return subgroup;
      }
    }
  }
  $scope.filterClick = function(filter, subgroup) {
    if (filter === undefined) {
      filter = $scope.getFilterByName($scope.currentcase.type);
      if (subgroup === undefined) {
        if (filter.subgroups === undefined) {
          delete $scope.currentcase.subgroup;
        } else {
          subgroup = $scope.getSubgroupByName(filter,$scope.currentcase.subgroup);
        }
      }
    }
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
  $scope.update = function(caseObject) {
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
