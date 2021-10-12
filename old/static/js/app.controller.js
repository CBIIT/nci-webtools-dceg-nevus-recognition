
// handles showing/filtering case images
app.controller('AppController', function ($rootScope, $scope, $timeout, $uibModal) {
    // use alias for current context
    var c = this;
    c.isNavCollapsed = false;
    c.scrollTopVisible = false;
    c.scrollTopThreshold = 200;

    $timeout(function() {
        c.disclaimerModal = $uibModal.open({
            animation: false,
            templateUrl: 'templates/disclaimer-modal.html',
            controllerAs: 'c',
            size: 'lg',
        });
    }, 100);

    // show/hide scroll to top
    angular.element(window).on('scroll', function() {
        var scrollTopVisible = +(window.scrollY || window.pageYOffset || 0) > c.scrollTopThreshold;
        // only $apply scope when the value needs to change
        if (scrollTopVisible != c.scrollTopVisible) {
            c.scrollTopVisible = scrollTopVisible;
            $scope.$apply();
        }
    })

    c.scrollToSmooth = function(top, left) {
        // these browsers do not support scroll options
        if (/MSIE|Trident/i.test(navigator.userAgent) || (
            /Safari/.test(navigator.userAgent) && 
            /Apple/i.test(navigator.vendor)
        )) {
            window.scrollTo(top, left);
        } else {
            window.scrollTo({
                top: top, 
                left: left,
                behavior: 'smooth'
            });
        }
    }
    
    $rootScope.$on('$locationChangeSuccess', function () {
        window.scrollTo(0, 0);
        c.isNavCollapsed = true;
    });
});
