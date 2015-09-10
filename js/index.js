var $container;
var filterValue='mole';
  var pages=1, itemsperpage=6, numitems=0, search="";
  var filterFns = {
    by6: function() {
      if(numitems<itemsperpage*pages && $(this).hasClass(filterValue)){
        numitems++;
        return true;
      }
      return false;
    },
    searchby6: function() {
      return true;
      if(numitems<itemsperpage*pages){
        numitems++;
        return true;
      }
      return false;
    }
  }
$( document ).ready( function() {
  // init Isotope
  $container = $('.isotope').isotope({
    itemSelector: '.item',
    filter: filterFns.by6
  });
  if($('.'+filterValue).length>pages*itemsperpage){
    $('.loadmore').show();
  }else{
    $('.loadmore').hide();
  }
  numitems=0;
  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    filterValue = $( this ).attr('data-filter');
    numitems=0;
    pages=1;
    $container = $('.isotope').isotope({
      itemSelector: '.item',
      filter: filterFns.by6
    });
    if($('.'+filterValue).length>pages*itemsperpage){
      $('.loadmore').show();
    }else{
      $('.loadmore').hide();
    }
  });
  $('.tool').on( 'click', function() {
    numitems=0;
    pages=1;
    $container = $('.isotope').isotope({
      itemSelector: '.item',
      filter: filterFns.by6
    });
    if($('.'+filterValue).length>pages*itemsperpage){
      $('.loadmore').show();
    }else{
      $('.loadmore').hide();
    }
  });
  $('.subgroup').on( 'click', 'button', function() {
    filterValue = $( this ).attr('data-filter');
    numitems=0;
    $container.isotope({ filter: filterFns.by6 });
    if($('.'+filterValue).length>pages*itemsperpage){
      $('.loadmore').show();
    }else{
      $('.loadmore').hide();
    }
  });
  
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  
  $('#search').keyup( function() {
    search = new RegExp( $(this).val(), 'gi' );
    numitems=0;
    pages=1;
    var loadmore=false;
    $container.isotope({
      itemSelector: '.item',
      filter: function() {
        if(numitems<itemsperpage*pages){
          numitems++;
          return search ? $(this).text().match( search ) : true;
        }else{
          loadmore=$(this).text().match( search )!=undefined;
           return false;
        }
       } 
    });
    $('.loadmore').hide();
    if(loadmore){
      $('.loadmoresearch').show();
    }else{
      $('.loadmoresearch').hide();
    }
  } );
  
  $('.loadmoresearch').on( 'click', function() {
    numitems=0;
    pages++;
    var loadmore=false;
    $container.isotope({
      itemSelector: '.item',
      filter: function() {
        if(numitems<itemsperpage*pages){
          numitems++;
          return search ? $(this).text().match( search ) : true;
        }else{
          loadmore=$(this).text().match( search )!=undefined;
           return false;
        }
       } 
    });
    if(!loadmore){
      $(this).hide();
    }
  });
  $('.loadmore').on( 'click', function() {
    
    numitems=0;
    pages++;
    $container.isotope({ filter: filterFns.by6 });
    if($('.'+filterValue).length<=pages*itemsperpage){
      $(this).hide();
    }
  });
  $('.backtotop').on( 'click', function() {
    $('body').animate({scrollTop:0}, 1000);
  });
  $( window ).scroll(function() {
    if($( window ).scrollTop()>500){
      $('.backtotop').addClass('active');
    }else{
      $('.backtotop').removeClass('active');
    }
  });
  
});

var app = angular.module('myApp', ['ngSanitize']);

app.controller('myCtrl', function($scope, $http) {
  $scope.cases=data.cases;
  $scope.filters=data.filters;
  $scope.currentcase={};
  $scope.currentimg=0;
  $scope.arrows=true;
  $scope.currenttype=$scope.filters[0];
  $scope.update = function(index) {
    $scope.currentcase=index;
    $scope.currentimg=0;
  }
  $scope.updatecurrentimg = function(index) {
    $scope.currentimg=index;
    $('.images img').removeClass('active');
    index++;
    $('.images img:nth-child('+index+')').addClass('active');
    $('.spinnerbox').addClass('spinner-show');
  }
  $scope.updatecurrenttype = function(index) {
    $scope.currenttype=index;
    $scope.searching=false;
    $scope.home=false;
    $scope.ulinks=false;
    $('.loadmoresearch').hide();
  }
  $scope.tool = function() {
    $scope.searching=false;
    $scope.home=false;
    $scope.ulinks=false;
    $('.loadmoresearch').hide();
  }
  $scope.clearsearch = function() {
    $scope.searching=false;
    $scope.home=false;
    $scope.ulinks=false;
    numitems=0;
    $container = $('.isotope').isotope({
      itemSelector: '.item',
      filter: filterFns.by6
    });
    $('.loadmoresearch').hide();
    if($('.'+filterValue).length>pages*itemsperpage){
      $('.loadmore').show();
    }else{
      $('.loadmore').hide();
    }
  }
  $scope.searchingfunc = function() {
    pages=1;
    numitems=0;
    $scope.home=false;
    $scope.ulinks=false;
    $scope.searching=true;
  }
  $scope.search="";
  $scope.searching=false;
  $scope.scrollLeft = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()-$('.images').width()}, 300);
  }
  $scope.scrollRight = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()+$('.images').width()}, 300);
  }
});

app.directive('subgroupDir', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      $('.subgroup button').on( 'click', function() {
        $(this).addClass('is-checked');
        $(this).siblings().removeClass('is-checked');
        filterValue = $( this ).attr('data-filter');
        numitems=0;
        $container.isotope({ filter: filterFns.by6 });
      });
       $('.subgroup').find('button').first().addClass('is-checked');
    }
  };
});


app.directive('filtersDir', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      $('#filters').find('button').first().addClass('is-checked');
    }
  };
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
      $('.images img:nth-child(1)').addClass('active');
      var imgwidth=$('.images img').length*114;
      if(imgwidth>$( window ).width()){
        $('.leftarrow').show();
        $('.rightarrow').show();
        $('.images').css('padding', '8px 50px');
      }else{
        $('.leftarrow').hide();
        $('.rightarrow').hide();
        $('.images').css('padding', '8px');
      }
      $( window ).resize(function() {
        if(imgwidth>$( window ).width()){
          $('.leftarrow').show();
          $('.rightarrow').show();
          $('.images').css('padding', '8px 50px');
        }else{
          $('.leftarrow').hide();
          $('.rightarrow').hide();
          $('.images').css('padding', '8px');
        }
      });
    }
    
  };
});