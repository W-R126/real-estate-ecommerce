app.config(function($stateProvider) {

  $stateProvider.state('ordersAdmin', {
    url: '/orders/admin?type',
    controller: 'OrdersAdminController',
    templateUrl: 'js/admin/orderControl/orderControl.html',
    resolve: {
      allOrders: function(OrderFactory, $stateParams) {
        return OrderFactory.getAllAdminOrders({orderStatus: $stateParams.type})
      }
    }
  });

})

app.controller('OrdersAdminController', function ($scope, allOrders, OrderFactory) {

  $scope.orders = allOrders;

  $scope.orderStats = ["Created", "Processing", "Cancelled", "Completed"];

  $scope.changeStatus = function(orderId, index, statusToChange, $log) {
    OrderFactory.updateOrderStatus(orderId, statusToChange)
    .then(order => {
      $scope.orders[index].orderStatus = order.orderStatus;
    })
    .catch($log.error);
  }

});
