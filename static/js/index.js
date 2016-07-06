// convenience method for single-page apps with usable links
function newState(urlParams, title) {
    var url = "";
    for (var index in urlParams) {
        url += '&' + index + '=' + urlParams[index];
    }
    url.length == 0 ? void(0) : url = '?' + url.substring(1, url.length);
    try {
        // If history state doesn't work with this browser there's nothing we can do to make it work short of reloading the page. Ignore the problem and move on.
        window.history.pushState == undefined ? void(0) : window.history.pushState(urlParams, "Moles, Dysplastic Nevi & Melanoma - " + title, window.location.pathname + url);
    } catch (e) {}
}

$(document).ready(function () {
    // Principle understands that disabling right click on images won't actually prevent people from downloading them but wants it done anyway
    $('body, html').on('contextmenu', 'img', function (event) {
        event.preventDefault();
    });
    // When case modal is hidden, reset current URL to reflect this
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
        // Used to allow enter and space to trigger AngularJS click functions without additional Angular code.
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
    // Used to allow enter and space to trigger AngularJS click functions without additional Angular code.
    $(document).on('keypress', '[tabindex][ng-click], button[data-dismiss="modal"]', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            $(e.target).trigger('click');
        }
    });
});

var app = angular.module('myApp', ['ngSanitize']);

app.controller('myCtrl', function ($rootScope, $scope, $http, $timeout) {
    // Because this is a single-page app, we need to use query parameters to determine what part of the page we're trying to access
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
    // Angular is awful. Case in point, the next two pages of mostly-useless variables just to make the "magic" work.
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
    // This and the isotope library are where most of the magic happens
    // This actually kind of an awful way to do things. It WILL break with a larger data set
    // But time constraints prevented a complete rewrite of what I was handed
    var basicFilter = function (trueFilter) {
        return function () {
            // actual filter is passed in by the calling function
            // which should either be someone clicking on one of the
            // filter links, or typing something in the search box
            if (trueFilter($(this))) {
                // Handles page load limitations
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
        // This little hack lets us use one block of code to handle both the searching and display methods with minimal redundant code
        trueFilter = typeof trueFilter === undefined ? function (element) {
            return true;
        } : trueFilter;
        // if we try to manipulate stuff from within an Angular heartbeat using non-Angular methodologies, it breaks the site. Literally. The whole site.
        // using $timeout lets it happen outside the Angular heartbeat so we can use isotope to handle panel arrangement
        $timeout(function () {
            $container.isotope({
                itemSelector: '.item',
                filter: basicFilter(trueFilter)
            });
        });
    };
    $scope.cases = data.cases; // case data
    $scope.filters = data.filters; // filter data
    $scope.about = false; // display about page?
    $scope.audience = false; // display audience page?
    $scope.currentcase = {};  // currently open case from case data
    $scope.currentimg = 0; // currently selected image in the currently open case
    $scope.currenttype = $scope.filters[0]; // filter currently being applied
    $scope.filterValue = ''; // ... because otherwise we have to put substantial code into the HTML.
    $scope.home = true; // display home page? default answer: yes
    $scope.searching = false; // Are we currently using the search function?
    $scope.tool = false; // display tool (meat of the app) page?
    $scope.ulinks = false; // display additional information page?
    $scope.showbacktotop = false; // Angular would rather I set a variable than use CSS or responsive Javascript
    $scope.showload = false; // As above
    $scope.search = ""; // Holds input from search box
    $scope.subgrouptype = null; // there's more than one kind of filter
    $scope.backToTop = function () { // if the function isn't declared as $scope, it can't be called from Angular's HTML code
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
    };
    $scope.changePage = function () { // convenience method to reset the visual appearance before we open a new page
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
        $scope.filterClick($scope.getFilterByName('mole'), true); // canceling search defaults to "Moles" section fo the cases
    };
    $scope.getFilterByName = function (filterName) { // Again, we need do things this way to avoid putting too much code in the Angular HTML
        for (var index = 0; index < $scope.filters.length; index++) {
            var filter = $scope.filters[index];
            if (filter.type == filterName) {
                return filter;
            }
        }
        return $scope.filters[0];
    }
    // There's a lot of actual work that goes into the 'magic' filters
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
    // Because Angular requires a whole bunch of JS code to work around all the problems its 'magic' creates
    $scope.goabout = function () {
        $scope.changePage();

        $("[aria-controls='about']").addClass('active');
        $scope.about = true;
        $("#about").children().first().focus();
        newState({
            'page': 'about'
        }, 'About the Tool');
    };
    // Because Angular...
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
    // Because Angular...
    $scope.gohome = function () {
        $scope.changePage();
        $("[aria-controls='home']").addClass('active');
        $scope.home = true;
        $("#home").children().first().focus();
        newState({
            'page': 'home'
        }, 'Home');
    };
    // Because Angular...
    $scope.gotool = function () {
        $scope.changePage();
        $("[aria-controls='cases']").addClass('active');
        $scope.tool = true;

        if ($scope.filterValue === '') {
            $scope.filterClick($scope.getFilterByName('mole'));
        }
    };
    // Because Angular...
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
    // Because Angular...
    $scope.godisclaimer = function () {
        $scope.changePage();

        $scope.disclaimer = true;

        $("[aria-controls='disclaimer']").addClass('active');
        $("#disclaimer").children().first().focus();
        newState({
            'page': 'disclaimer'
        }, 'Disclaimer');
    };
    // Because Angular...
    $scope.loadMore = function () {
        pages++;
        $scope.showload = false;
        numitems = 0;
        isotopic($scope.tool ? filterFns.by6 : filterFns.searchby6);
    }
    // Because Angular...
    $scope.scrollLeft = function () {
        $('.images').animate({
            scrollLeft: $('.images').scrollLeft() - $('.images').width()
        }, 300);
    }
    // Because Angular...
    $scope.scrollRight = function () {
        $('.images').animate({
            scrollLeft: $('.images').scrollLeft() + $('.images').width()
        }, 300);
    }
    // Because Angular...
    // triggered by typing in the search box
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
    // Because Angular...
    // opens case modal with proper data
    $scope.update = function (caseObject, index) {
        $scope.currentcase = caseObject;
        var urlParams = window.history.state || {};
        urlParams.case = index;
        newState(urlParams, 'Recognition Tool');
        $scope.updatecurrentimg(0);
    };
    // Because Angular... *sigh*
    // updates case modal's data based on selected image
    $scope.updatecurrentimg = function (index) {
        $scope.currentimg = index;
        var urlParams = window.history.state || {};
        urlParams.img = index;
        newState(urlParams, 'Recognition Tool');
        index++;
        $('.spinnerbox').addClass('spinner-show');
    };
    // There are lots of things Angular can't handle or doesn't handle well. Like responsive Javascript.
    // Specifically, in this case, responding to down a 'page'.
    $(window).scroll(function () {
        // This is kind of the inverse of $timeout. $scope.$apply forces the function to occur within Angular's heartbeat framework
        // Without this, the variables don't update properly and even if they did the UI changes wouldn't be triggered
        $scope.$apply(function () {
            $scope.showbacktotop = $(window).scrollTop() > 500;
        });
    });
    // responds to 'new page' events such as using the forward and back buttons on the browser
    $(window).bind('popstate', function () {
        loadFunction();
    });
    // Only triggers when one navigates to the URL. Not triggered by forward and back buttons
    $(window).load(function () {
        loadFunction();
        $timeout(function () {
            $('#disclaimerModal').modal('show');
        });
        // I'm not actually sure why this is here and not with other, similar functions,
        // but I probably tried and it didn't work for one reason or another. onLoad
        // is as good a place as any, anyway.
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

// This allows our data to contain HTML and, specifically, AngularJS directives
// This should never be applied to anything with user-submitted content
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

// makes the image carousel work properly in Angular
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

// filters allow us to feed data through a function before it shows up on the front end
// This theoretically one causes the first letter of each word to be capitalized.
app.filter('titleCase', function () {
    return function (input) {
        output = input || '';
        return output.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
})

// This one automatically picks out (very specific) cancer terms from our glossary
// and wraps them in the proper context to allow of definition popups to work
// This would break down with a larger glossary but it works for now
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