app.config(function ($stateProvider) {
  $stateProvider.state('building', {
    url: '/properties/:id',
    templateUrl: 'js/building-detail/building-detail.html',
    controller: 'BuildingCtrl',
    resolve:{
      theBuilding: function (BuildingFactory, $stateParams){
        return BuildingFactory.fetchOne($stateParams.id);
      }
    }
  })
})

app.controller('BuildingCtrl', function($scope){

})

app.config(function ($stateProvider) {
  $stateProvider.state('buildings', {
    url: '/properties',
    templateUrl: 'js/building-detail/buildings.html',
    controller: 'BuildingsCtrl',
    resolve:{
      allBuildings: function (BuildingFactory){
        return BuildingFactory.fetchAll();
      }
    }
  })
})

app.controller('BuildingsCtrl', function($scope, allBuildings){
$scope.buildings = allBuildings
})
