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
  $scope.toggleAdmin = function(userId, adminStatus, index) {
    console.log('was clicked!!!');
    console.log(adminStatus);
    UserFactory.changeAdmin(userId, !adminStatus)
      .then(() => {
        $scope.users[index].isAdmin = !adminStatus;
      })
      .catch(console.log('Error in setting admin'))
  }
});
