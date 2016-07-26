app.config(function ($stateProvider) {
  $stateProvider.state('building-detail', {
    url: '/building/:id',
    templateUrl: 'js/building-detail/building-detail.html',
    controller: 'BuildingCtrl'
  })
})

app.controller('BuildingCtrl', function($scope){

})

app.config(function ($stateProvider) {
  $stateProvider.state('buildings', {
    url: '/properties',
    templateUrl: 'js/building-detail/buildings.html',
    controller: 'BuildingsCtrl'
  })
})

app.controller('BuildingsCtrl', function($scope){

})
