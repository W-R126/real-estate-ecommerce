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
      image: '/img/empire-state-building.jpg',
      locale: 'auto',
      token: function(token) {
        $scope.tokenId = token.id
        $scope.tokenEmail = token.email
      }
    });

    var cartTotal = ($scope.$parent.total*100).toString();

    $scope.openStripe = function () {
        handler.open({
        name: 'Buildings Bros Payment',
        description: $scope.$parent.cart.buildings.length + ' building(s)',
        amount: cartTotal
         })
    }

    $scope.sendCheckout= function(credentials) {
        $scope.error = null;

        credentials.email = $scope.tokenEmail;
        credentials.creditCard = $scope.tokenId;

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
