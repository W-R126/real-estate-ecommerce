app.factory('CartFactory', function ($http) {

  const cartArray = [];

  var CartFactory = {};

  CartFactory.fetchOne = function () {
    return $http.get('/api/carts/')
    .then(function (response) { return response.data; });
  };

  CartFactory.add = function (buildingId) {
    return $http.put('/api/carts/' + buildingId);
  }

  return CartFactory;
});
