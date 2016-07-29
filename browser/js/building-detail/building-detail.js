app.controller('BuildingCtrl', function($scope, theBuilding, $log){
  $scope.building = theBuilding;
})

//building child states for reviews
app.config(function ($stateProvider) {
  $stateProvider.state('building.reviews', {
    url: '/reviews',
    templateUrl: 'js/building-detail/templates/building-reviews.html',
    controller: 'ReviewsCtrl',
    resolve:{
      theReviews: function (ReviewFactory, $stateParams){
        return ReviewFactory.fetchAll({buildingId: $stateParams.id})
      }
    }
  })
  .state('building.write', {
    url: '/write',
    templateUrl: 'js/building-detail/templates/building-write.html'
  })
})


app.controller('ReviewsCtrl', function($scope, theReviews){
  $scope.reviews = theReviews;
  $scope.getTimes = function(n){
    return new Array(n)
  }
})





// all buildings page
app.config(function ($stateProvider) {
  $stateProvider.state('buildings', {
    url: '/properties?type',
    templateUrl: 'js/building-detail/templates/buildings.html',
    controller: 'BuildingsCtrl',
    resolve:{
      allBuildings: function (BuildingFactory, $stateParams){
        console.log("Type:", $stateParams.type);
        return BuildingFactory.fetchAll({propertyType: $stateParams.type});
      }
    }
  })
})


//single building page
app.config(function ($stateProvider) {
  $stateProvider.state('building', {
    url: '/properties/:id',
    templateUrl: 'js/building-detail/templates/building-detail.html',
    controller: 'BuildingCtrl',
    resolve:{
      theBuilding: function (BuildingFactory, $stateParams){
        return BuildingFactory.fetchOne($stateParams.id);
      }
    }
  })
})


app.controller('BuildingsCtrl', function($scope, allBuildings){
  $scope.buildings = allBuildings;
})


