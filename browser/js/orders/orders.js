app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('orders', {
        url: '/orders',
        controller: 'OrderController',
        templateUrl: 'js/orders/templates/orders.html',
        resolve: {
          theOrders: function(OrderFactory) {
            return OrderFactory.getAllUserOrders();
          }
        }
    });

});

app.controller('OrderController', function ($scope, theOrders) {
  $scope.orders = theOrders;
});
