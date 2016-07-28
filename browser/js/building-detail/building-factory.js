app.factory('BuildingFactory', function ($http) {

  var BuildingFactory = {};

  BuildingFactory.fetchAll = function () {
    return $http.get('/api/buildings/?')
    .then(function (response) { return response.data; });
  };

    BuildingFactory.fetchOne = function (id) {
    return $http.get('/api/buildings/' +id)
    .then(function (response) { return response.data; });
  };

  BuildingFactory.fetchAllCommercial = function() {
    return $http.get('/api/buildings/commercial')
    .then(res => res.data);
  }

  BuildingFactory.fetchAllResidential = function() {
    return $http.get('/api/buildings/residential')
    .then(res => res.data);
  }

  BuildingFactory.fetchAllMixed = function() {
    return $http.get('/api/buildings/mixed')
    .then(res => res.data);
  }

  return BuildingFactory;
});
