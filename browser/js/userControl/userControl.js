app.config(function ($stateProvider) {

    $stateProvider.state('users', {
        url: '/users',
        controller: 'UserController',
        templateUrl: 'js/userControl/templates/userControl.html',
        resolve: {
          allUsers: function(UserFactory) {
            return UserFactory.fetchAll();
          }
        }
    });
});


app.controller('UserController', function ($scope, allUsers) {
  $scope.users = allUsers;
});
