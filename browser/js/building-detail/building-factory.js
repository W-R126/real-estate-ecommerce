app.factory('BuildingFactory', function ($http) {

  var BuildingFactory = {};

  BuildingFactory.fetchAll = function (args) {
    return $http.get('/api/buildings', {params: args})
    .then(res => res.data);
  };

  BuildingFactory.fetchOne = function (id) {
    return $http.get('/api/buildings/' + id)
    .then(res => res.data);
  };

  BuildingFactory.changeStatus = function(id, propertyStatus) {
    return $http.put('/api/buildings/changeStatus/' + id, {isAvailable: propertyStatus})
      .then(res => res.data);
  }

  BuildingFactory.changePropertyType = function(id, propertyType) {
    return $http.put('/api/buildings/changeType/' + id, {propertyType: propertyType})
      .then(res => res.data);
  }

  BuildingFactory.updateProperty = function(id, propertyInfo) {
    return $http.put('/api/buildings/updateBuilding/' + id, propertyInfo)
      .then(res => res.data);
  }

  return BuildingFactory;

});
