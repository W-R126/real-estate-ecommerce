app.config(function ($stateProvider) {

    $stateProvider.state('orders', {
        url: '/orders',
        controller: 'OrdersController',
        templateUrl: 'js/orders/templates/orders.html',
        resolve: {
          theOrders: function(OrderFactory) {
            return OrderFactory.getAllUserOrders();
          }
        }
    });

});

app.controller('OrdersController', function ($scope, theOrders) {
  $scope.orders = theOrders;
});


app.config(function ($stateProvider) {
  $stateProvider.state('order', {
    url: '/orders/:id',
    templateUrl: 'js/orders/templates/order-detail.html',
    controller: 'OrderController',
    resolve: {
      theOrder: function (OrderFactory, $stateParams){
        return OrderFactory.findAllForOrderId($stateParams.id);
      }
    }
  })
})

app.controller('OrderController', function ($scope, theOrder) {
  $scope.theOrder = theOrder;
  $scope.getTotal = function () {
      var total = 0;
      for(var i = 0; i < theOrder.purchasedBuildings.length; i++){
          total += theOrder.purchasedBuildings[i].purchasePrice;
      }
      return total;
  }
});
