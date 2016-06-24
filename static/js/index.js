function newState(urlParams, title) {
    var url = "";
    for (var index in urlParams) {
        url += '&' + index + '=' + urlParams[index];
    }
    url.length == 0 ? void(0) : url = '?' + url.substring(1, url.length);
    try {
        window.history.pushState == undefined ? void(0) : window.history.pushState(urlParams, "Moles, Dysplastic Nevi & Melanoma - " + title, window.location.pathname + url);
    } catch (e) {}
}

$(document).ready(function () {
    $('body, html').on('contextmenu', 'img', function (event) {
        event.preventDefault();
    });
    $('#case').on('hidden.bs.modal', function () {
        var urlParams = window.history.state || {};
        delete urlParams.case;
        delete urlParams.img;
        newState(urlParams, 'Recognition Tool');
    });

    $("[role='tab']").not(".is-checked").attr("aria-expanded", false);
    $(".is-checked[role='tab']").attr("aria-expanded", true);
    
    /*
        specifying aria-expanded on collapsible elements, to signify the element's visible state 
    */
    
    $("[role='tab'], .partial-collapse").on("click keypress", function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            $(e.target).trigger('click');
        }
        if ($(this).hasClass('is-checked')) {
            $(this).attr("aria-expanded", true);
            $(this).siblings().attr("aria-expanded", false);
        }
        if ($(this).hasClass("partial-collapse")) {
            if ($(this).hasClass("show"))
                $(this).attr("aria-expanded", true);
            else
                $(this).attr("aria-expanded", false);
        }
    });

    $(".info-bubble").on("click keypress", function (e) {
        $.each($(".info-bubble").not(this), function (i, el) {
            $(el).removeClass("open");
            $(el).attr("aria-expanded", false);
        });

        $(this).attr("aria-expanded", true);
        if(!$(this).hasClass("open") )
            $(this).addClass("open");
    });

    $("[role='tab']").on("show.bs.collapse", function () {
        $(this).attr("aria-expanded", true);
    });

    $("[role='tab']").on("hide.bs.collapse", function () {
        $(this).attr("aria-expanded", false);
    });
    $('.app').on('click', '.blur', function () {
        $(this).blur();
    });
    $(document).on('keypress', '[tabindex][ng-click], button[data-dismiss="modal"]', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            $(e.target).trigger('click');
        }
    });
});

var app = angular.module('myApp', ['ngSanitize']);

app.controller('myCtrl', function ($rootScope, $scope, $http, $timeout) {
    var loadFunction = function () {
        var match, pl = /\+/g, // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1);
        var urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
        $scope.$apply(function () {
            if (urlParams.page == undefined)
                urlParams.page = 'home';
            $scope.changePage();

            switch (urlParams.page) {
            case 'home':
                $scope.home = true;
                $("[aria-controls='home']").addClass('active');
                break;
            case 'about':
                $scope.about = true;
                $("[aria-controls='about']").addClass('active');
                break;
            case 'audience':
                $scope.audience = true;
                $("[aria-controls='audience']").addClass('active');
                break;
            case 'tool':
                $("[aria-controls='cases']").addClass('active');
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
                        $scope.filterClick(filter, subgroup, true);
                    } else {
                        $scope.filterClick(filter, undefined, true);
                    }
                } else if (urlParams.search !== undefined) {
                    $scope.search = urlParams.search;
                    $scope.searchingfunc();
                }
                if (urlParams.case !== undefined) {
                    $scope.update($scope.cases[urlParams.case], urlParams.case);
                    if (urlParams.img !== undefined) {
                        $scope.updatecurrentimg(urlParams.img);
                    }
                    $timeout(function () {
                        $('#case').modal('show');
                    });
                }
                break;
            case 'ulinks':
                $scope.ulinks = true;
                $("[aria-controls='ulinks']").addClass('active');
                break;
            case 'disclaimer':
                $scope.disclaimer = true;
                $("[aria-controls='disclaimer']").addClass('active');
                break;
            }
        });
    };
    var pages = 1,
        itemsperpage = 6,
        numitems = 0,
        search = "";
    var filterFns = {
        by6: function (element) {
            return element.hasClass($scope.filterValue);
        },
        searchby6: function (element) {
            return search ? element.text().match(search) : true;
        }
    };
    var $container = $('.isotope');
    var basicFilter = function (trueFilter) {
        return function () {
            if (trueFilter($(this))) {
                if (numitems < itemsperpage * pages) {
                    numitems++;
                    return true;
                } else {
                    $scope.showload = true;
                }
            }
        };
    };
    var isotopic = function (trueFilter) {
        trueFilter = typeof trueFilter === undefined ? function (element) {
            return true;
        } : trueFilter;
        $timeout(function () {
            $container.isotope({
                itemSelector: '.item',
                filter: basicFilter(trueFilter)
            });
        });
    };
    $scope.cases = data.cases;
    $scope.filters = data.filters;
    $scope.about = false;
    $scope.audience = false;
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
    $scope.backToTop = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
    };
    $scope.changePage = function () {
        $scope.showfull = false;
        $scope.about = false;
        $scope.audience = false;
        $scope.home = false;
        $scope.tool = false;
        $scope.searching = false;
        $scope.ulinks = false;
        $scope.disclaimer = false;

        $(".nav.navbar-nav li a").removeClass("active");

        $('body,html').animate({
            scrollTop: 0
        }, 100);
    };
    $scope.clearsearch = function () {
        $scope.search = "";
        $scope.filterClick($scope.getFilterByName('mole'), true);
    };
    $scope.getFilterByName = function (filterName) {
        for (var index = 0; index < $scope.filters.length; index++) {
            var filter = $scope.filters[index];
            if (filter.type == filterName) {
                return filter;
            }
        }
        return $scope.filters[0];
    }
    $scope.filterClick = function (filter, subgroup, fromHistory) {
        var urlParams = window.history.state || {};
        urlParams.page = 'tool';
        delete urlParams.subgrouptype;
        if (!$scope.tool || subgroup === undefined) {
            $scope.changePage();
            // highlighting cases link on change
            $("[aria-controls='cases']").addClass('active');
            $scope.tool = true;
        }
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
        if (!fromHistory)
            newState(urlParams, 'Recognition Tool');
        isotopic(filterFns.by6);
    }
    $scope.goabout = function () {
        $scope.changePage();

        $("[aria-controls='about']").addClass('active');
        $scope.about = true;
        $("#about").children().first().focus();
        newState({
            'page': 'about'
        }, 'About the Tool');
    };
    $scope.goaudience = function (e) {
        if (e !== undefined) {
            e.stopPropagation();
        }
        $scope.changePage();

        $("[aria-controls='audience']").addClass('active');
        $scope.audience = true;

        $("#audience").children().first().focus();
        newState({
            'page': 'audience'
        }, 'Intended Audience');
    }
    $scope.gohome = function () {
        $scope.changePage();
        $("[aria-controls='home']").addClass('active');
        $scope.home = true;
        $("#home").children().first().focus();
        newState({
            'page': 'home'
        }, 'Home');
    };
    $scope.gotool = function () {
        $scope.changePage();
        $("[aria-controls='cases']").addClass('active');
        $scope.tool = true;

        if ($scope.filterValue === '') {
            $scope.filterClick($scope.getFilterByName('mole'));
        }
    };
    $scope.goulinks = function (e) {
        if (e !== undefined) {
            e.stopPropagation();
        }
        $scope.changePage();

        $scope.ulinks = true;
        $("[aria-controls='ulinks']").addClass('active');
        $("#ulinks").children().first().focus();
        newState({
            'page': 'ulinks'
        }, 'Useful Links');
    };
    $scope.godisclaimer = function () {
        $scope.changePage();

        $scope.disclaimer = true;

        $("[aria-controls='disclaimer']").addClass('active');
        $("#disclaimer").children().first().focus();
        newState({
            'page': 'disclaimer'
        }, 'Disclaimer');
    };
    $scope.loadMore = function () {
        pages++;
        $scope.showload = false;
        numitems = 0;
        isotopic($scope.tool ? filterFns.by6 : filterFns.searchby6);
    }
    $scope.scrollLeft = function () {
        $('.images').animate({
            scrollLeft: $('.images').scrollLeft() - $('.images').width()
        }, 300);
    }
    $scope.scrollRight = function () {
        $('.images').animate({
            scrollLeft: $('.images').scrollLeft() + $('.images').width()
        }, 300);
    }
    $scope.searchingfunc = function () {
        if ($scope.search == undefined) {
            return $scope.clearsearch();
        }
        $scope.currenttype = null;
        $scope.changePage();
        $scope.searching = true;
        search = new RegExp($scope.search, 'gi');
        numitems = 0;
        pages = 1;
        $scope.showload = false;
        newState({
            'page': 'tool',
            'search': $scope.search
        }, 'Recognition Tool');
        isotopic(filterFns.searchby6);
    }
    $scope.update = function (caseObject, index) {
        $scope.currentcase = caseObject;
        var urlParams = window.history.state || {};
        urlParams.case = index;
        newState(urlParams, 'Recognition Tool');
        $scope.updatecurrentimg(0);
    };
    $scope.updatecurrentimg = function (index) {
        $scope.currentimg = index;
        var urlParams = window.history.state || {};
        urlParams.img = index;
        newState(urlParams, 'Recognition Tool');
        index++;
        $('.spinnerbox').addClass('spinner-show');
    };
    $(window).scroll(function () {
        $scope.$apply(function () {
            $scope.showbacktotop = $(window).scrollTop() > 500;
        });
    });
    $(window).bind('popstate', function () {
        loadFunction();
    });
    $(window).load(function () {
        loadFunction();
        $timeout(function () {
            $('#disclaimerModal').modal('show');
        });
        $('#case').on('swipeleft', '.currentimage', function () {
            $scope.$apply(function () {
                $scope.updatecurrentimg(Math.min($scope.currentimg + 1, $scope.currentcase.images.length - 1));
            });
        }).on('swiperight', '.currentimage', function () {
            $scope.$apply(function () {
                $scope.updatecurrentimg(Math.max(0, $scope.currentimg - 1));
            });
        });
    });
});

app.directive('bindCompiledHtml', function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                return scope.$eval(attrs.bindCompiledHtml);
            },
            function (value) {
                element.html(value);
                $compile(element.contents())(scope)
            }
        )
    }
});

app.directive('imageOnLoad', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('load', function () {
                // Set visibility: true + remove spinner overlay
                $('.spinnerbox').removeClass('spinner-show');
            });
            scope.$watch('ngSrc', function () {});
        }
    };
});

app.directive('carouselDir', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
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
            $(window).resize(function () {
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

app.filter('titleCase', function () {
    return function (input) {
        output = input || '';
        return output.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
})

app.filter('define', function () {
    return function (input) {
        output = input || '';
        for (var term in $_cancer_terms) {
            var dynamic = $_cancer_terms[term].dynamic || [term];
            for (var index in dynamic) {
                output = output.replace(new RegExp('\\b(' + dynamic[index] + ')\\b', 'i'), '<span class="define" data-term="' + term + '">$1</span>');
            }
        }
        return output;
    };
});