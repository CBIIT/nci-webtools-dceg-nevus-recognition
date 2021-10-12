
// handles showing/filtering case images
app.controller('ViewCasesController', function ($rootScope, $scope, $location, $route, $timeout, $uibModal, cases, filters) {
    // use alias for current context
    var c = this;
    c.cases = cases;
    c.filters = filters;
    c.routeParams = $route.current.params;
    c.search = c.routeParams.search;
    c.showMoreInformation = c.routeParams.info == 1;
    c.showImageModal = c.routeParams.case !== undefined && c.cases[+c.routeParams.case];
    c.showImageLimit = +c.routeParams.limit || 6;

    // determine selected filter from url (if not found, use first available filter)
    c.filter = c.filters.find(function (filter) {
        return filter.type === c.routeParams.filter;
    }) || c.filters[0];

    // determine selected subgroup from url
    c.subgroup = null;
    if (c.filter && c.filter.subgroups && c.filter.subgroups.length) {
        // if subgroup is not found, use first available subgroup
        c.subgroup = c.filter.subgroups.find(function (subgroup) {
            return subgroup.type === c.routeParams.subgrouptype;
        }) || c.filter.subgroups[0];
    }

    // retrieve cases based on filter and subgroup
    c.getCases = function (filter, subgroup) {
        return c.cases.filter(function (cas /* case is a keyword */) {
            return cas.type === filter.type && (
                !subgroup || // no subgroup selected
                subgroup.type === c.filter.type || // subgroup's type matches selected case's type
                subgroup.type === cas.subgroup // subgroup's type matches case's subgroup
            );
        });
    }

    // retrieve cases based on search term(s)
    c.searchCases = function (query) {
        return c.cases.filter(function (c) {
            var content = JSON.stringify(c).toLowerCase();
            return content.includes(query.toLowerCase());
        });
    }

    // show image modal if we have a case parameter in the url
    if (c.showImageModal) {
        // do not animate modals: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
        c.imageModal = $uibModal.open({
            animation: false,
            windowClass: 'image-modal',
            ariaLabelledBy: 'image-modal-title',
            ariaDescribedBy: 'image-modal-body',
            templateUrl: 'templates/image-modal.html',
            keyboard: false,
            backdrop: 'static',
            controller: function () {
                this.caseIndex = c.routeParams.case;
                this.imgIndex = c.routeParams.img || 0;
                this.case = c.cases[this.caseIndex];
                this.filter = c.filter;
                this.subgroup = c.subgroup;
                this.search = c.search;
                this.showImageLimit = c.showImageLimit;
                this.showMoreInformation = c.showMoreInformation;
            },
            controllerAs: 'c',
            size: 'xl',
        });

        // restore modal scroll position
        c.imageModal.rendered.then(function(test) {
            c.modalDiv = document.querySelector('.image-modal');
            c.modalDiv.scrollTo(0, $rootScope.cachedModalScrollY || 0);
        });
    }

    // handle side-effects of opening/closing modals
    $scope.$on('$locationChangeStart', function (event, nextLocation, previousLocation) {
        if (c.showImageModal) {
            $rootScope.cachedModalScrollY = c.modalDiv ? c.modalDiv.scrollTop : 0;
        } else {
            $rootScope.cachedScrollY = window.scrollY || window.pageYOffset;
        }
    });

    $scope.$on('$locationChangeSuccess', function (event, nextLocation, previousLocation) {
        // only continue if nextLocation is within /view-cases
        if ($location.path() !== '/view-cases')
            return;

        // attempt to restore position as soon as possible
        $timeout(function() { 
            window.scrollTo(0, $rootScope.cachedScrollY || 0);
        });

        // restore window scroll position and close previous modal
        $timeout(function() {
            // attempt to restore position after page has reflowed
            window.scrollTo(0, $rootScope.cachedScrollY || 0);
            c.imageModal && c.imageModal.close();
        }, 100);
    });
});
