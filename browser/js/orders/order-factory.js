app.factory('OrderFactory', function($http, $q){
  var OrderFactory = {};

  OrderFactory.getAllUserOrders = function() {
    return $http.get('/api/orders/')
    .then(orders => orders.data)
  }

  OrderFactory.findAllForOrderId = function(args) {
    return $http.get('/api/orders/' + args)
    .then(res => res.data);
  }

  OrderFactory.checkout = function (credentials) {
    return $http.post('/api/orders', credentials)
    .then(res => res.data)
    .catch(function () {
      return $q.reject({ message: 'Invalid checkout credentials'});
    });
  }

  return OrderFactory;
})
