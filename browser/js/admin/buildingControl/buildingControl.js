app.config(function($stateProvider) {

  $stateProvider.state('propertiesAdmin', {
    url: '/property-control/admin',
    controller: 'PropertiesAdminController',
    templateUrl: 'js/admin/buildingControl/templates/buildingsControl.html',
    resolve: {
      allProperties: function(BuildingFactory) {
        return BuildingFactory.fetchAll();
      }
    }
  })

})

app.controller('PropertiesAdminController', function($scope, allProperties, BuildingFactory) {

  $scope.properties = allProperties;

  $scope.toggleAvailable = function(propertyId, propertyStatus, index) {
    BuildingFactory.changeStatus(propertyId, !propertyStatus).then(() => $scope.properties[index].isAvailable = !propertyStatus)
    .catch(console.error);
  }

});
