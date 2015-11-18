function newState(urlParams,title) {
  var url = "";
  for (var index in urlParams) {
    url += '&'+index+'='+urlParams[index];
  }
  url.length==0?void(0):url = '?'+url.substring(1,url.length);
  window.history.replaceState==undefined?void(0):window.history.replaceState(urlParams, "Moles, Dysplastic Nevi & Melanoma - "+title, window.location.pathname+url);
}

$(document).ready( function() {
  $('body, html').on('contextmenu', 'img', function(event) {
    event.preventDefault();
  });
  $('#case').on('adamant.modal.hidden', function() {
    var urlParams = window.history.state || {};
    delete urlParams.case;
    delete urlParams.img;
    newState(urlParams, 'Recognition Tool');
  });
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
  $scope.filterValue = '';
  $scope.home = true;
  $scope.searching = false;
  $scope.tool = false;
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
    $scope.disclaimer = false;
  };
  $scope.clearsearch = function() {
    $scope.search = "";
    $scope.filterClick($scope.getFilterByName('mole'),true);
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
  $scope.filterClick = function(filter, subgroup) {
    var urlParams = window.history.state || {};
    urlParams.page = 'tool';
    delete urlParams.subgrouptype;
    $scope.changePage();
    $scope.tool = true;
    $scope.filterValue = filter.type;
    $scope.currenttype = filter;
    urlParams.filter = $scope.filterValue;
    numitems = 0;
    pages = 1;
    $scope.showload = false;
    if (subgroup !== undefined) {
      $scope.filterValue = subgroup.type;
      $scope.subgrouptype = subgroup;
      urlParams.subgrouptype = subgroup.type;
    } else if (filter.subgroups) {
      $scope.filterValue = filter.subgroups[0].type;
      $scope.subgrouptype = filter.subgroups[0];
      urlParams.subgrouptype = filter.subgroups[0].type;
    }
    newState(urlParams, 'Recognition Tool');
    isotopic(filterFns.by6);
  }
  $scope.goabout = function() {
    $scope.changePage();
    $scope.about = true;
    newState({
      'page': 'about'
    }, 'About the Tool')
  };
  $scope.gohome = function() {
    $scope.changePage();
    $scope.home = true;
    newState({
      'page': 'home'
    }, 'Home');
  };
  $scope.gotool = function() {
    $scope.changePage();
    $scope.tool = true;
    if ($scope.filterValue == '') {
      $scope.filterClick($scope.getFilterByName('mole'));
    }
    newState({
      'page': 'tool',
      'filter': $scope.filterValue
    }, 'Recognition Tool');
  };
  $scope.goulinks = function() {
    $scope.changePage();
    $scope.ulinks = true;
    newState({
      'page': 'ulinks'
    }, 'Useful Links');
  };
  $scope.godisclaimer = function() {
    $scope.changePage();
    $scope.disclaimer = true;
    newState({
      'page': 'disclaimer'
    }, 'Disclaimer');
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
    newState({
      'page': 'tool',
      'search': $scope.search
    }, 'Recognition Tool');
    isotopic(filterFns.searchby6);
  }
  $scope.update = function(caseObject,index) {
    $scope.currentcase=caseObject;
    var urlParams = window.history.state || {};
    urlParams.case = index;
    newState(urlParams, 'Recognition Tool');
    $scope.updatecurrentimg(0);
  };
  $scope.updatecurrentimg = function(index) {
    $scope.currentimg=index;
    var urlParams = window.history.state || {};
    urlParams.img = index;
    newState(urlParams, 'Recognition Tool');
    index++;
    $('.spinnerbox').addClass('spinner-show');
  };
  $(window).scroll(function() {
    $scope.$apply(function() {
      $scope.showbacktotop = $(window).scrollTop() > 500;
    });
  });
  $(window).load( function() {
    var match,
      pl = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query = window.location.search.substring(1);
    var urlParams = {};
    while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);
    newState(urlParams,document.title);
    $scope.$apply(function() {
      if (urlParams.page !== undefined) {
        switch (urlParams.page) {
          case 'home':
            $scope.gohome();
            break;
          case 'about':
            $scope.goabout();
            break;
          case 'tool':
            if (urlParams.filter !== undefined) {
              var filter = $scope.getFilterByName(urlParams.filter);
              if (filter.subgroups !== undefined) {
                var subgroup = filter.subgroups[0];
                if (urlParams.subgrouptype !== undefined) {
                  for (var index in filter.subgroups) {
                    if (filter.subgroups[index].type == urlParams.subgrouptype) {
                      subgroup = filter.subgroups[index];
                    }
                  }
                }
                $scope.filterClick(filter,subgroup);
              } else {
                $scope.filterClick(filter);
              }
            } else if (urlParams.search !== undefined) {
              $scope.search = urlParams.search;
              $scope.searchingfunc();
            }
            if (urlParams.case !== undefined) {
              $scope.update($scope.cases[urlParams.case],urlParams.case);
              if (urlParams.img !== undefined) {
                $scope.updatecurrentimg(urlParams.img);
              }
              $timeout(function() { $.adamant.modal.open('#case'); });
            }
            break;
          case 'ulinks':
            $scope.goulinks();
            break;
          case 'disclaimer':
            $scope.godisclaimer();
            break;
        }
      }
    });
    $('#case').on('swipeleft','.currentimage',function() {
      $scope.$apply(function() {
        $scope.updatecurrentimg(Math.min($scope.currentimg+1,$scope.currentcase.images.length-1));
      });
    }).on('swiperight','.currentimage',function() {
      $scope.$apply(function() {
        $scope.updatecurrentimg(Math.max(0,$scope.currentimg-1));
      });
    });
  });
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

app.filter('titleCase', function() {
  return function(input) {
    output = input || '';
    return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
})

app.filter('define', function() {
  return function(input) {
    output = input || '';
    for (var term in $_cancer_terms) {
      var dynamic = $_cancer_terms[term].dynamic || [ term ];
      for (var index in dynamic) {
        output = output.replace(new RegExp('\\b('+dynamic[index]+')\\b','i'),'<span class="define" data-term="'+term+'">$1</span>');
      }
    }
    return output;
  };
});
