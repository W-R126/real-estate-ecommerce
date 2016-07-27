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


//NOTE: I copied pasted from fsg's login and replaced login=> signup
//we still need to write this controller properly
app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function(signUpInfo) {
        $scope.error = null;

        AuthService.signup(signUpInfo)
        .then(function() {
            $state.go('property')
        })
        .catch(function() {
            $scope.error = 'Invalid signup credentials';
        });
    }

});
