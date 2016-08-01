app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve:{
          useTypes: function (SearchFactory){
            return SearchFactory.getTypes();
          },
          archStyles: function(SearchFactory){
            return SearchFactory.getStyles();
          }
    }
    });
});

app.controller('HomeCtrl', function($scope, $state, $log, SearchFactory, useTypes, archStyles){

  $scope.searchProps = {};
  $scope.price =[];
  $scope.types = useTypes;
  $scope.styles= archStyles;
  $scope.stories = [{range: "1 to 10", i: {$between: [1,10]}}, {range: "11 to 50", i:{$between: [11,50]}}, {range: "50 to 100", i:{$between: [50,100]}}];

  $scope.search = function(){
    $scope.searchProps.price = {$between: [$scope.minPrice*100, $scope.maxPrice*100]};
    var searchProps = JSON.stringify($scope.searchProps);
    $state.go("search-results", {searchProps: searchProps})
    }
})
