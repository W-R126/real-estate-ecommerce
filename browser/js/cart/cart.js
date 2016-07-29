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

  $scope.deleteItem = function (buildingId, index) {
    CartFactory.delete(buildingId)
    .then(function () {
      $scope.cart.buildings.splice(index, 1);
    })
  }
});