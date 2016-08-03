app.config(function ($stateProvider) {

    $stateProvider.state('users', {
        url: '/users',
        controller: 'UserController',
        templateUrl: 'js/admin/userControl/templates/userControl.html',
        resolve: {
          allUsers: function(UserFactory) {
            return UserFactory.fetchAll();
          }
        }
    });

    $stateProvider.state('resetPassword', {
      url: '/reset-password/:id',
      controller: 'PasswordController',
      templateUrl: 'js/admin/userControl/templates/passwordReset.html'
    })

});


app.controller('UserController', function ($scope, allUsers, UserFactory, $log) {
  $scope.users = allUsers;

  $scope.toggleAdmin = function(userId, adminStatus, index) {
    UserFactory.changeAdmin(userId, !adminStatus)
      .then(() => {
        $scope.users[index].isAdmin = !adminStatus;
      })
      .catch($log.error);
  }

  $scope.deleteUser = function(userId, index) {
    UserFactory.delete(userId)
    .then(function () {
      $scope.users.splice(index, 1);
    })
    .catch($log.error);
  }

  $scope.togglePassword = function(userId) {
    UserFactory.changePassword(userId)
    .catch(console.error);
  }

});

app.controller('PasswordController', function($scope, UserFactory, $state, $log) {

  $scope.resetPassword = function(credentials) {
    UserFactory.resetPassword(credentials)
    .then(() => {
      $state.go('login');
    })
    .catch($log.error);
  }

});
