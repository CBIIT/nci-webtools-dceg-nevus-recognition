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
  $scope.casesReordered = function() {
    $scope.$apply(function() {
      $scope.cases.sort(function(a,b) {
        return a.order==b.order?1:a.order-b.order;
      })
      for (var index in $scope.cases) {
        $scope.cases[index].order = parseInt(index)+1;
      }
      $timeout(function() {
        $container.isotope('destroy');
        isotopic(filterFns.by6);
      });
    });
  }
  $scope.createNew = function() {
    var newCase = { 'order': $scope.cases.length };
    newCase.type = $scope.currenttype.type;
    if ($scope.subgrouptype) {
      newCase.subgroup = $scope.subgrouptype.type;
    }
    $scope.cases.push(newCase);
    for (var index in $scope.cases) {
      $scope.cases[index].order = parseInt(index)+1;
    }
    $scope.update(newCase);
    $timeout(function() {
      $container.isotope('destroy');
      isotopic(filterFns.by6);
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
  $scope.imageSelected = function(target) {
    $scope.fileToUpload = target.files[0];
  };
  $scope.removeCase = function(index) {
    if (confirm("Pressing 'OK' will permanently delete this case.")) {
      var thisCase = $scope.cases.splice(index,1)[0];
      if (thisCase._id) {
        $.ajax({
          url: 'cases',
          type: 'DELETE',
          data: JSON.stringify({"_id":thisCase._id}),
          processData: false,
          contentType: 'application/json',
          dataType: 'json',
          cache: false
        }).fail(function(data) {
          console.log(data)
        }).done(function(data) {
          console.log(data);
        });
      }
      for (var index in $scope.cases) {
        $scope.cases[index].order = parseInt(index)+1;
      }
      $timeout(function() {
        $container.isotope('destroy');
        isotopic(filterFns.by6);
      });
    }
  };
  $scope.removeImage = function(index) {
    $scope.currentcase.images.splice(index,1);
    $scope.updatecurrentimg(0);
  }
  $scope.saveChanges = function() {
    $.ajax({
      url: 'cases',
      type: 'PUT',
      data: JSON.stringify($scope.cases),
      processData: false,
      contentType: 'application/json',
      dataType: 'json',
      cache: false
    }).fail(function(data) {
      console.log(data)
    }).done(function(data) {
      if (data && !data.error) {
        $scope.cases = data.cases;
        $timeout(function() {
          $container.isotope('destroy');
          isotopic(filterFns.by6);
        })
      } else {
        console.log(data);
      }
    });
  };
  $scope.scrollLeft = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()-$('.images').width()}, 300);
  };
  $scope.scrollRight = function() {
    $('.images').animate({scrollLeft:$('.images').scrollLeft()+$('.images').width()}, 300);
  };
  $scope.update = function(caseObject) {
    $scope.currentcase=caseObject;
    $scope.updatecurrentimg(0);
  };
  $scope.updatecurrentimg = function(index) {
    $scope.currentimg=index;
    $('.spinnerbox').addClass('spinner-show');
  };
  $scope.uploadImage = function(e) {
    var formData = new FormData($(e.target).parent()[0]);
    $.ajax({
      url: 'image',
      type: 'POST',
      xhr: function() {
        var myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload){
          myXhr.upload.addEventListener('progress',function(other) {
            if(other.lengthComputable){
              $(e.target).parent().next().attr({value:other.loaded,max:other.total});
            }
          }, false);
        }
        return myXhr;
      },
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json',
      cache: false
    }).fail(function(data) {
      $scope.$apply(function() {
        $scope.fileUploadError = "Unrecognized Error: "+JSON.stringify(data);
      });
    }).done(function(data) {
      $(e.target).prev().val('');
      $(e.target).parent().next().val(0);
      $scope.$apply(function() {
        if (data.error) {
          $scope.fileUploadError = data.error;
        } else {
          $scope.currentcase.images = $scope.currentcase.images || [];
          $scope.currentcase.images.push(data);
          $scope.updatecurrentimg($scope.currentcase.images.length-1);
          $.adamant.modal.close($('#uploadForm'));
        }
      });
    });
    e.preventDefault();
  };
  $(window).scroll(function() {
    $scope.$apply(function() {
      $scope.showbacktotop = $(window).scrollTop() > 500;
    });
  });
  $(window).load(function() {
    $('#uploadForm').on('adamant.modal.hidden', function() {
      delete $scope.fileUploadError;
    });
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
        output = output.replace(new RegExp('\\b('+dynamic[index]+')\\b','i'),'<span className="define" data-term="'+term+'">$1</span>');
      }
    }
    return output;
  };
});
