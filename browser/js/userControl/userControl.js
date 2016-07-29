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


app.controller('UserController', function ($scope, allUsers, UserFactory) {
  $scope.users = allUsers;
  $scope.toggleAdmin = function(userId, adminStatus) {
    console.log('was clicked!!!');
    UserFactory.changeAdmin(userId, adminStatus);
  }
});
