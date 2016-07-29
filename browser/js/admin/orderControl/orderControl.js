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

app.controller('OrderController', function ($scope, allOrders, OrderFactory) {
  $scope.users = allUsers;

  $scope.toggleAdmin = function(userId, adminStatus, index) {
    UserFactory.changeAdmin(userId, !adminStatus)
      .then(() => {
        $scope.users[index].isAdmin = !adminStatus;
      })
      .catch(console.error('Error in setting admin'))
  }

  $scope.deleteUser = function(userId, index) {
    console.log('I was clicked!!');
    UserFactory.delete(userId)
    .then(function () {
      $scope.users.splice(index, 1);
    })
    .catch(console.error('Error in deleting user'))
  }

});
