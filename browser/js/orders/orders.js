app.config(function ($stateProvider) {

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


app.config(function ($stateProvider) {
  $stateProvider.state('building', {
    url: '/properties/:id',
    templateUrl: 'js/building-detail/templates/building-detail.html',
    controller: 'BuildingCtrl',
    resolve:{
      theBuilding: function (BuildingFactory, $stateParams){
        return BuildingFactory.fetchOne($stateParams.id);
      }
    }
  })
})
