app.factory('UserFactory', function ($http) {

  var UserFactory = {};

  UserFactory.create = function (data) {
    return $http.post('/api/users/', data)
    .then(function (response) { return response.data; })
    .catch(function(error){console.error(error);
    });
  };


  return UserFactory;
});
