app.config(function ($stateProvider) {
  $stateProvider.state('building.reviews', {
    url: '/reviews',
    templateUrl: 'js/review/building-reviews.html',
    controller: 'ReviewsCtrl',
    resolve:{
      theReviews: function (ReviewFactory, $stateParams){
        return ReviewFactory.fetchAll({buildingId: $stateParams.id})
      }
    }
  })
  .state('building.write', {
    url: '/write',
    templateUrl: 'js/review/building-write.html'
  })
})


app.controller('ReviewsCtrl', function($scope,ReviewFactory, theReviews){
  $scope.reviews = theReviews;
  $scope.getTimes = function(n){
    return new Array(n)
  }
   $scope.sendReview = function(review) {
        $scope.error = null;

        ReviewFactory.create(review)
        .catch(function() {
            $scope.error = 'Invalid signup credentials';
        });
    }
})
