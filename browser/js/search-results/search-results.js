app.config(function($stateProvider){
  $stateProvider.state('search-results', {
    url: '/buildings',
    templateUrl: 'js/search-results/search-results.html',
    controller: 'ResultsCtrl',
    resolve: {
      theBuildings: function($stateParams){
        console.log("****BUILDINGS***", $stateParams);
        return $stateParams.theBuildings;
      }
    }
  })
})

app.controller('ResultsCtrl', function($scope, theBuildings){
  $scope.buildings = theBuildings;
})
