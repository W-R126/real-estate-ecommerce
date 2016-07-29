app.factory('OrderFactory', function($http){
  var OrderFactory = {};

  OrderFactory.getAllUserOrders = function() {
    return $http.get('/api/orders/')
    .then(orders => orders.data);
  }

  OrderFactory.findAllForOrderId = function(args) {
    return $http.get('/api/orders', {params: args})
    .then(res => res.data);
  }

  return OrderFactory;
})
