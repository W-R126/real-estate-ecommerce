app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve:{
          useTypes: function (SearchFactory){
            return SearchFactory.getTypes();
          }
          archStyles: function(SearchFactory){
            return SearchFactory.getStyles;
          }
    }
    });
});

app.controller('HomeCtrl', function($scope, $state, $log, SearchFactory, useTypes){

  // $scope.types = [{name:"Commercial"}, {name:"Residential"}, {name: "Mixed-Use"}];
  $scope.types = useTypes;
  $scope.styles= archStyles;
  $scope.floors = [{range: "1-10"}, {range: "11-50"}, {range: "50-100"}];
  $scope.message = "Hello!";
  $scope.search = function(){
    var searchProps = JSON.stringify($scope.searchProps);
    $state.go("search-results", {searchProps: searchProps})
    }
})
