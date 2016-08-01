app.config(function($stateProvider) {

  $stateProvider.state('propertiesAdmin', {
    url: '/properties/admin',
    controller: 'PropertiesAdminController',
    templateUrl: 'js/admin/buildingControl/templates/buildingControl.html',
    resolve: {
      allProperties: function(BuildingFactory) {
        return BuildingFactory.fetchAll();
      }
    }
  })

})

app.controller('PropertiesAdminController', function($scope, allProperties) {

  $scope.properties = allProperties;

});
