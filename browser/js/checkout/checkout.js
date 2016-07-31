app.config(function ($stateProvider) {

    $stateProvider.state('cart.checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, OrderFactory) {

    $scope.error = null;

    $scope.sendCheckout= function(credentials) {
        $scope.error = null;

        OrderFactory.checkout(credentials)
        .then(function() {
            $state.go('orders');
            //$state.go('checkoutSuccess')
        })
        .catch(function() {
            $scope.error = 'Invalid shipping credentials';
        });
    }

});
