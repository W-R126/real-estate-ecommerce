app.factory('ReviewFactory', function ($http) {

  var ReviewFactory = {};

  ReviewFactory.fetchAll = function (args) {
    return $http.get('/api/reviews', {params: args})
    .then(function (response) { return response.data; });
  };

    ReviewFactory.fetchOne = function (id) {
    return $http.get('/api/reviews/' +id)
    .then(function (response) { return response.data; });
  };

  return ReviewFactory;
});
