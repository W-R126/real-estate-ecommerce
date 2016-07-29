app.factory('CartFactory', function ($http) {

  var CartFactory = {};

  CartFactory.fetchOne = function () {
    return $http.get('/api/carts/')
    .then(function (response) { return response.data; });
  };

  CartFactory.add = function (buildingId) {
    return $http.put('/api/carts/' + buildingId);
  }

  CartFactory.delete = function (buildingId) {
    return $http.delete('/api/carts/' + buildingId);
  }

  return CartFactory;
});
