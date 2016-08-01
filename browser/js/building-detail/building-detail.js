app.controller('BuildingCtrl', function($scope, theBuilding, CartFactory, $state, AuthService){
  $scope.building = theBuilding;
  $scope.loggedIn = !AuthService.isAuthenticated();
  $scope.message = "Please Sign In To Leave a Review";
  $scope.addToCart = function () {
    CartFactory.add(theBuilding.id);
    $state.go('cart');
  }
})


//single building page
app.config(function ($stateProvider) {
  $stateProvider.state('building', {
    url: '/properties/:id',
    templateUrl: 'js/building-detail/templates/building-detail.html',
    controller: 'BuildingCtrl',
    resolve: {
      theBuilding: function (BuildingFactory, $stateParams) {
        return BuildingFactory.fetchOne($stateParams.id);
      }
    }
  })
})


app.controller('BuildingsCtrl', function($scope, allBuildings) {
  $scope.buildings = allBuildings;

})


// all buildings page
app.config(function ($stateProvider) {
  $stateProvider.state('buildings', {
    url: '/properties?type',
    templateUrl: 'js/building-detail/templates/buildings.html',
    controller: 'BuildingsCtrl',
    resolve: {
      allBuildings: function (BuildingFactory, $stateParams) {
        console.log("Type:", $stateParams.type);
        return BuildingFactory.fetchAll({propertyType: $stateParams.type});
      }
    }
  })
})

