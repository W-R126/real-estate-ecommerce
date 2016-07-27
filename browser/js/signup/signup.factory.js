app.factory('UserFactory', function ($http) {

  var UserFactory = {};

  UserFactory.create = function (data) {
    console.log('*************', data)
    return $http.post('/api/users/', data)
    .then(function (response) { return response.data; })
    .catch(function(error){console.error(error);
    });
  };


  return UserFactory;
});
