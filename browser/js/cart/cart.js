app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html',
        resolve: {
          theCart: function (CartFactory) {
            return CartFactory.fetchOne();
          }
        }
    });

});

app.controller('CartController', function ($scope, theCart, CartFactory) {
  $scope.cart = theCart;

  $scope.getTotal = function () {
      if (!$scope.cart) return "No items in cart!";
      var total = 0;
      for(var i = 0; i < $scope.cart.buildings.length; i++){
          total += $scope.cart.buildings[i].price;
      }
      return '$'+ total;
  }

  $scope.deleteItem = function (buildingId, index) {
    CartFactory.delete(buildingId)
    .then(function () {
      $scope.cart.buildings.splice(index, 1);
    })
  }

});