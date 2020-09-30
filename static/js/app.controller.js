
// handles showing/filtering case images
app.controller('AppController', function ($rootScope, $scope, $route) {
    // use alias for current context
    var c = this;
    c.isNavCollapsed = false;
    
    $rootScope.$on('$locationChangeSuccess', function () {
        window.scrollTo(0, 0);
    });
});
