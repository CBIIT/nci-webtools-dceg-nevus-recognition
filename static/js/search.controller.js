// propagates newest values from search input
app.controller('SearchController', function ($scope, $location) {
    var c = this;
    this.search = '';
    $scope.$watch(function() {return c.search}, function (newValue) {
        var query = newValue.trim();
        if (query.length) {
            $location.url('/view-cases?search=' + query);
        }
    });
});