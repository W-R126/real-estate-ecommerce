app.factory('OrderFactory', function($http){
  var OrderFactory = {};

  OrderFactory.getAllUserOrders = function() {
    return $http.get('/api/orders/')
    .then(orders => orders.data);
  }

  OrderFactory.findAllForOrderId = function(args) {
    return $http.get('/api/orders/' + args)
    .then(res => res.data);
  }

  OrderFactory.getAllAdminOrders = function(args) {
    return $http.get('/api/buildings', {params: args})
      .then(res => res.data);
  }

  return OrderFactory;
})
