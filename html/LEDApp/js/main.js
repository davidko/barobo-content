/**
 * Created by Adam on 2/14/2015.
 */
var chapter2 = angular.module('chapter2', ['ngRoute', 'ui.bootstrap']);

chapter2.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'tocController',
        templateUrl: 'views/toc.html'
    }).when('/lesson-one', {
        controller: 'lessonOneController',
        templateUrl: 'views/lesson-one.html'
    }).when('/lesson-two', {
        controller: 'lessonTwoController',
        templateUrl: 'views/lesson-two.html'
    }).when('/lesson-three', {
        controller: 'lessonThreeController',
        templateUrl: 'views/lesson-three.html'
    }).when('/lesson-four', {
        controller: 'lessonFourController',
        templateUrl: 'views/lesson-four.html'
    }).when('/lesson-five', {
        controller: 'lessonFiveController',
        templateUrl: 'views/lesson-five.html'
    }).when('/lesson-six', {
        controller: 'lessonSixController',
        templateUrl: 'views/lesson-six.html'
    }).when('/lesson-seven', {
        controller: 'lessonSevenController',
        templateUrl: 'views/lesson-seven.html'
    }).when('/lesson-eight-a', {
        controller: 'lessonEightAController',
        templateUrl: 'views/lesson-eight-a.html'
    }).when('/lesson-eight-b', {
        controller: 'lessonEightBController',
        templateUrl: 'views/lesson-eight-b.html'
    }).when('/lesson-eight-c', {
        controller: 'lessonEightCController',
        templateUrl: 'views/lesson-eight-c.html'
    }).otherwise({ redirectTo: '/'});
    
}]);
/**
 * Created by Adam on 2/14/2015.
 */
chapter2.controller('tocController', ['$scope', function($scope) {
    // TOC has no logic.
}]).controller('lessonOneController', ['$scope', function($scope) {
    
    
}]).controller('lessonTwoController', ['$scope', function($scope) {


}]).controller('lessonThreeController', ['$scope', function($scope) {


}]).controller('lessonFourController', ['$scope', function($scope) {


}]).controller('lessonFiveController', ['$scope', function($scope) {


}]).controller('lessonSixController', ['$scope', function($scope) {


}]).controller('lessonSevenController', ['$scope', function($scope) {


}]).controller('lessonEightAController', ['$scope', function($scope) {


}]).controller('lessonEightBController', ['$scope', function($scope) {


}]).controller('lessonEightCController', ['$scope', function($scope) {


}]);
