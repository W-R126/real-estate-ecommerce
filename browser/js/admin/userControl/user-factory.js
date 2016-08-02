app.factory('UserFactory', function ($http) {

  var UserFactory = {};

  UserFactory.fetchAll = function () {
    return $http.get('/api/users')
    .then(res => res.data);
  };

  UserFactory.changeAdmin = function(userId, adminStatus) {
    return $http.put('/api/users/changeAdmin/' + userId, {isAdmin: adminStatus})
      .then(res => res.data);
  }

  UserFactory.delete = function (userId) {
    return $http.delete('/api/users/' + userId)
      .then(res => res.data);
  }

  UserFactory.changePassword = function(userId) {
    return $http.put('/api/users/changePass/' + userId)
      .then(res => res.data);
  }

  UserFactory.resetPassword = function(credentials) {
    return $http.put('/api/users/resetPass', credentials)
    .then(res => res.data);
  }

  return UserFactory;
});
