app.config(function ($stateProvider) {

    $stateProvider.state('cart.checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, OrderFactory) {

    $scope.error = null;
    var handler = StripeCheckout.configure({
      key: 'pk_test_xILSRH2bsYyTPagCeiIDFpz2',
      image: '/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`

      }
    });

    $scope.openStripe = function () {
        handler.open({
        name: 'Buildings',
        description: $scope.cart.buildings.length + " buildings",
        amount: $scope.cart.getTotal()
         })
    }

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
