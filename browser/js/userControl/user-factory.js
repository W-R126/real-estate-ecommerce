app.factory('UserFactory', function ($http) {

  var UserFactory = {};

  UserFactory.fetchAll = function () {
    return $http.get('/api/users')
    .then(function (response) { return response.data; });
  };

  return UserFactory;
});
