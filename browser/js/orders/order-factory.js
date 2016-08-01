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
    return $http.get('/api/orders/admin', {params: args})
      .then(res => res.data);
  }

  OrderFactory.updateOrderStatus = function(orderStatus, orderId) {
    return $http.update('/api/orders/admin/status/' + orderId, {orderStatus: orderStatus})
      .then(res => res.data);
  }

  return OrderFactory;
})
