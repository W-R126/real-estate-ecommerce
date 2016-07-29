app.config(function($stateProvider) {
    $stateProvider.state('building.reviews', {
            url: '/reviews',
            templateUrl: 'js/review/building-reviews.html',
            controller: 'ReviewCtrl',
            resolve: {
                theReviews: function(ReviewFactory, $stateParams) {
                    return ReviewFactory.fetchAll({ buildingId: $stateParams.id })
                }
            }
        })
        .state('building.write', {
            url: '/write',
            templateUrl: 'js/review/building-write.html',
            controller: 'newReviewCtrl'
        })
});


app.controller('ReviewCtrl', function($scope, theReviews, ReviewFactory) {
    $scope.reviews = theReviews;
    $scope.getTimes = function(n) {
        return new Array(n)
    }
    $scope.sendReview = function() {
        ReviewFactory.create($scope.newReview)
            .then(function(review) {
                $state.go('building.reviews')
            })
            .catch(function(error) {
                console.error(error)
            });
    }
});


app.controller('newReviewCtrl', function($scope, ReviewFactory, $state) {

        $scope.sendReview = function() {
            ReviewFactory.create($scope.newReview)
                .then(function(review) {
                    $state.go('building.reviews')
                })
        }.catch(function(error) {
            console.error(error)
        });
});
