app.factory('OrderFactory', function($http){
  var OrderFactory = {};

  OrderFactory.getAllUserOrders = function() {
    return $http.get('/api/orders/')
    .then(function(orders){return orders.data});
  }

  OrderFactory.searchFields = function(obj){

    return $http.get('/api/buildings/?'+"propertyType="+obj.propertyType)
    .then(buildings=>buildings.data);
  }

  return OrderFactory;
})
