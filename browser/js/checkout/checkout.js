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
        .then(function(res) {
            console.log("************ YO", res);
            $state.go('checkoutSuccess', {id: res});
        })
        .catch(function() {
            $scope.error = 'Invalid shipping credentials';
        });
    }

});
app.config(function ($stateProvider) {

    $stateProvider.state('checkoutSuccess', {
        url: '/checkout/success',
        templateUrl: 'js/checkout/checkout-success.html',
        controller: 'SuccessCtrl',
        resolve: {
            theOrder: function (OrderFactory, $stateParams) {
                return OrderFactory.findAllForOrderId($stateParams.id);
            }
        }
    });

});

app.controller('SuccessCtrl', function ($scope, $state, theOrder) {

    $scope.orderNum = theOrder.convertId;

});
