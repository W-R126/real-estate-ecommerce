app.factory('CartFactory', function ($http) {

  const cartArray = [];

  var CartFactory = {};

  CartFactory.fetchAll = function () {
    return $http.get('/api/buildings/')
    .then(function (response) { return response.data; });
  };

  return CartFactory;
});
