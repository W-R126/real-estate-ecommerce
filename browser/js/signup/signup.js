app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

     $stateProvider.state('property', {
        url: '/properties',
        templateUrl: 'js/building-detail/buildings.html',
        controller: 'SignupCtrl'
    });


});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function(signUpInfo) {
        $scope.error = null;

        AuthService.signup(signUpInfo)
        .then(function() {
            $state.go('buildings')
        })
        .catch(function() {
            $scope.error = 'Invalid signup credentials';
        });
    }

});
