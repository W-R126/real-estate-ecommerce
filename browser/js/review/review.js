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


app.controller('ReviewCtrl', function($scope, theReviews, ReviewFactory, $log) {
    $scope.reviews = theReviews;
    $scope.getTimes = function(n) {
        return new Array(n)
    }
    $scope.sendReview = function() {
        ReviewFactory.create($scope.newReview)
            .then(function(review) {
                $state.go('building.reviews')
            })
            .catch($log.error);
    }
});


app.controller('newReviewCtrl', function($scope, ReviewFactory, $state, $log) {
      $scope.ratings = [{
        current: 1,
        max: 5
    }];

    $scope.getSelectedRating = function(rating) {
    $scope.newReview.numOfStars = rating

    }

    $scope.sendReview = function(review) {
            ReviewFactory.create(review)
            .then(function(review) {
                $state.go('building.reviews')
            })
            .catch($log.error);
    }
});


//star controller


app.directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function($scope, elem, attrs) {

            var updateStars = function() {
                $scope.stars = [];
                for (var i = 0; i < $scope.max; i++) {
                    $scope.stars.push({
                        filled: i < $scope.ratingValue
                    });
                }
            };

            $scope.toggle = function(index) {
                $scope.ratingValue = index + 1;
                $scope.onRatingSelected({
                    rating: index + 1
                });
            };

            $scope.$watch('ratingValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});

//end of star controller
