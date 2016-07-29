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

app.controller('CartController', function ($scope, theCart) {
  $scope.cart = theCart;
/*  $scope.deleteItem = */
});