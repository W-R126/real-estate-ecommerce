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

  $scope.orderStatuses = ["Created", "Processing", "Cancelled", "Completed"];

  $scope.changeStatus = function(orderId) {
    OrderFactory.updateOrderStatus($scope.statusToChange, orderId)
    .then()
    .catch(console.error);
  }

});
