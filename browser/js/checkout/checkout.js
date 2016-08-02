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
            $state.go('checkoutSuccess', {id: res});
        })
        .catch(function() {
            $scope.error = 'Invalid shipping credentials';
        });
    }

    $scope.stripeCallback = function (code, result) {
        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {
            window.alert('success! token: ' + result.id);
        }
    };

});

app.config(function ($stateProvider) {

    $stateProvider.state('checkoutSuccess', {
        url: '/checkout/success/:id',
        templateUrl: 'js/checkout/checkout-success.html',
        controller: 'SuccessCtrl',
        resolve: {
            theOrder: function (OrderFactory, $stateParams) {
                return OrderFactory.findAllForOrderId($stateParams.id);
            }
        }
    });

});

app.controller('SuccessCtrl', function ($scope, $state, theOrder, AuthService) {

    $scope.email = theOrder.email;
    $scope.orderNum = theOrder.convertId;

    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

});
