app.factory('CartFactory', function ($http, $q) {

  var CartFactory = {};

  CartFactory.fetchOne = function () {
    return $http.get('/api/carts/')
    .then(function (response) { return response.data; });
  };

  CartFactory.add = function (buildingId) {
    return $http.put('/api/carts/' + buildingId)
    .then(res => res.data)
    .catch(function () {
      return $q.reject({ message: 'Error: Cart already has building in it'});
    });
  }

  CartFactory.delete = function (buildingId) {
    return $http.delete('/api/carts/' + buildingId);
  }

  return CartFactory;
});
