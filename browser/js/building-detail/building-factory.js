app.factory('BuildingFactory', function ($http) {

  var BuildingFactory = {};

  BuildingFactory.fetchAll = function (args) {
    return $http.get('/api/buildings', {params: args})
    .then(function (response) { return response.data; });
  };

    BuildingFactory.fetchOne = function (id) {
    return $http.get('/api/buildings/' +id)
    .then(function (response) { return response.data; });
  };

  return BuildingFactory;
});
