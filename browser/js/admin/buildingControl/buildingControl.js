app.config(function($stateProvider) {

  $stateProvider.state('propertiesAdmin', {
    url: '/properties-control/admin',
    controller: 'PropertiesAdminController',
    templateUrl: 'js/admin/buildingControl/templates/buildingsControl.html',
    resolve: {
      allProperties: function(BuildingFactory) {
        return BuildingFactory.fetchAllAdmin();
      }
    }
  })

  $stateProvider.state('propertyAdmin', {
    url: '/property-control/admin/:id',
    controller: 'PropertyAdminController',
    templateUrl: 'js/admin/buildingControl/templates/buildingControl.html',
    resolve: {
      fetchProperty: function(BuildingFactory, $stateParams) {
        return BuildingFactory.fetchOne($stateParams.id);
      }
    }
  })

})

app.controller('PropertiesAdminController', function($scope, allProperties, BuildingFactory, SearchFactory) {

  $scope.properties = allProperties;

  SearchFactory.getTypes()
  .then(function (types) {
      $scope.propertyTypes = types;
  });

  $scope.toggleAvailable = function(propertyId, propertyStatus, index, $log) {
    BuildingFactory.changeStatus(propertyId, !propertyStatus).then(() => $scope.properties[index].isAvailable = !propertyStatus)
    .catch($log.error);
  }

  $scope.changeType = function(propertyId, index, typeToChange, $log) {
    BuildingFactory.changePropertyType(propertyId, typeToChange)
    .then((property) => $scope.properties[index].propertyType = property.propertyType)
    .catch($log.error);
  }

});

app.controller('PropertyAdminController', function($scope, fetchProperty, BuildingFactory, $state) {

  $scope.property = fetchProperty;

  $scope.error = null;

  $scope.updateProperty = function(id, propertyInfo, $log) {
    $scope.error = null;
    BuildingFactory.updateProperty(id, propertyInfo)
    .then(() => $state.go('propertiesAdmin'))
    .catch(err => {
      $scope.error = 'Invalid update info for property. Error: ' + err.data;
      $log.error;
    });
  }

})
