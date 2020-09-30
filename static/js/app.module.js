var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

// map routes to templates and controllers
app.config(['$routeProvider', function ($routeProvider) {

    // helper method for resolving dependencies
    function getData(url) {
        return function($http) {
            return $http.get(url, {cache: true}).then(function(response) {
                return response.data;
            });
        };
    }

    $routeProvider
        .when('/home', { templateUrl: 'templates/home.html' })
        .when('/about', { templateUrl: 'templates/about.html' })
        .when('/intended-audience', { templateUrl: 'templates/intended-audience.html' })
        .when('/view-cases', {
            templateUrl: 'templates/view-cases.html',
            controller: 'ViewCasesController',
            controllerAs: 'c',
            resolve: {
                cases: ['$http', getData('data/cases.json')],
                filters: ['$http', getData('data/filters.json')],
            }
        })
        .when('/more-information', { templateUrl: 'templates/more-information.html' })
        .when('/disclaimer', { templateUrl: 'templates/disclaimer.html' })
        .otherwise({ templateUrl: 'templates/home.html' });
}]);


app.config(['$sanitizeProvider', function($sanitizeProvider) {
    $sanitizeProvider.addValidElements(['attr', 'details', 'summary']);
    $sanitizeProvider.addValidAttrs(['define-terms', 'title']);
}]);

// principle understands that disabling right click on images won't actually prevent people from downloading them but wants it done anyway
app.directive('noContextMenu', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('contextmenu', function (event) {
                event.preventDefault();
            })
        }
    }
});

// allow us to use anchor links normally (eg: <a ng-anchor="#main">Go To Main</a>)
app.directive('ngAnchor', function ($location, $anchorScroll) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$locationChangeSuccess', function() {
                var url = $location.url().split('#')[0];
                attrs.$set('href', '#!' + url + attrs.ngAnchor);
                element.on('click', function() {
                    document.querySelector(attrs.ngAnchor).focus();
                })
            });
        }
    }
});

// allow us to add classes to anchors if the current route matches the anchor's route
app.directive('ngRouteActiveClass', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$locationChangeSuccess', function() {
                var $el = angular.element(element);
                var href = attrs.href.replace(/^#!/, '').split(/[#?]/g)[0];
                if (href === $location.path()) {
                    $el.addClass(attrs.ngRouteActiveClass);
                } else {
                    $el.removeClass(attrs.ngRouteActiveClass);
                }
            });
        }
    }
});

app.directive('ngCompileHtml', function ($sce, $compile, $http) {
    return {
        // priority: 0,
        restrict: 'A',
        link: function(scope, element, attrs) {
            var unwatch = scope.$watch(
                function(scope) {
                    return $sce.parseAsHtml(attrs.ngCompileHtml)(scope);
                },
                function(value) {
                    if (element[0].hasAttribute('define-terms')) {
                        // special case - element also has 'define-terms' directive
                        defineTerms($http, value).then(resolve);
                    } else {
                        resolve(value);
                    }
                }
            );

            function resolve(value) {
                element.html(value);
                $compile(element.contents())(scope);
                unwatch();
            }
        }
    }
});

// defines terms within a specific element
app.directive('defineTerms', function($http) {
    return {
        // priority: 10,
        restrict: 'A',
        link: function(scope, element, attrs) {
            defineTerms($http, element.html()).then(function(html) {
                element.html(html);
            });


/*            if (attrs.ngCompileHtml) {
                var unwatch = scope.$watch(function(scope) {
                    return $sce.parseAsHtml(attrs.ngCompileHtml)(scope);
                },
                function(value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                    unwatch();
                });
            } */
        }
    }
});

// principle understands that disabling right click on images won't actually prevent people from downloading them but wants it done anyway
app.filter('titleCase', function () {
    return function(input) {
        return (input || '').replace(/\w+/g, function(word) {
            return word[0].toUpperCase() + word.substr(1).toLowerCase();
        });
    };
});

function defineTerms($http, html) {
    return $http.get('data/glossary.json', {cache: true}).then(function(response) {
        // define longest terms first
        response.data.sort(function(a, b) {
            return b.term.length - a.term.length;
        }).forEach(function(record) {
            // join all regular expressions if needed
            var match = '\\b(' + (record.regexp || [record.term]).join('|') + ')\\b';

            // ensure we don't define terms within tags
            var regexp = new RegExp(match + '(?![^<]*>|[^<>]*</)', 'ig');

            // show term and definition in title
            var title = [record.term, record.definition].join(': ');

            html = html.replace(regexp, function(value) {
                return '<abbr title="' + title + '">' + value + '</abbr>';
            });
        });

        return html;
    });
}
