app.config(function ($stateProvider) {

    $stateProvider.state('cart.checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state) {

    $scope.error = null;

    $scope.sendCheckout= function(credentials) {
        $scope.error = null;

        AuthService.signup(credentials)
        .then(function() {
            $state.go('buildings')
        })
        .catch(function() {
            $scope.error = 'Invalid signup credentials';
        });
    }

});
