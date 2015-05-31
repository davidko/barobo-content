/**
 * Created by Adam on 3/2/2015.
 */
var chapter3 = angular.module('chapter3', ['ngRoute', 'ui.bootstrap', 'hljs', 'ngSanitize']);

chapter3.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'driversEdPart1',
        templateUrl: 'views/drivers-ed-part1.html'
    }).when('/drivers-ed-part2', {
        controller: 'driversEdPart2',
        templateUrl: 'views/drivers-ed-part2.html'
    }) .when('/drivers-ed-explore', {
        controller: 'driversEdExplore',
        templateUrl: 'views/drivers-ed-explore.html'
    }).when('/drivers-ed-challenge', {
        controller: 'driversEdChallenge',
        templateUrl: 'views/drivers-ed-challenge.html'
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
    }).otherwise({ redirectTo: '/'});

}]);
/**
 * Created by Adam on 3/2/2015.
 */
chapter3.controller('driversEdPart1', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        $scope.m.robot.angularSpeed(90,90,90);
        $scope.m.robot.move(360, 0, 0);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('driversEdPart2', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        $scope.m.robot.angularSpeed(90,90,90);
        $scope.m.robot.move(0, 0, -360);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('driversEdExplore', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        pos: [0, 0, 0],
        robot: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.stop = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.robot.stop();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        var pos = $scope.m.pos.map(function(num) { return parseInt(num, 10); });
        $scope.m.running = true;
        $scope.m.robot.angularSpeed(90,90,90);
        $scope.m.robot.move(pos[0], pos[1], pos[2]);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('driversEdChallenge', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        pos: [0, 0, 0],
        robot: null,
        running: false,
        alt1: 'box unchecked',
        alt2: 'box unchecked',
        src1: 'img/box.svg',
        src2: 'img/box.svg'
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.stop = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.robot.stop();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        var pos = $scope.m.pos.map(function(num) { return parseInt(num, 10); });
        $scope.m.running = true;
        $scope.m.robot.angularSpeed(90,90,90);
        $scope.m.robot.move(pos[0], pos[1], pos[2]);
        $scope.m.running = false;
        if (pos[0] < 0 && pos[2] < 0 && pos[0] == pos[2] ) {
            $scope.m.src2 = 'img/check.svg';
            $scope.m.alt2 = 'box checked';
        } else if (pos[0] > 0 && pos[2] < 0 && (pos[0] === (pos[2] * - 1) )) {
            $scope.m.src1 = 'img/check.svg';
            $scope.m.alt1 = 'box checked';
        } else {
            if ($scope.m.alt1 !== 'box checked') {
                $scope.m.src1 = 'img/cross.svg';
                $scope.m.alt1 = 'box error';
            }
            if ($scope.m.alt2 !== 'box checked') {
                $scope.m.src2 = 'img/cross.svg';
                $scope.m.alt2 = 'box error';
            }
        }
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonOneController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        $scope.m.robot.angularSpeed(90,0,90);
        $scope.m.robot.move(0, 0, -190);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonTwoController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false,
        speed: [90, 90, 90]
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        var speeds = $scope.m.speed.map(function(num) { return Math.abs(parseInt(num, 10)) % 241; });
        $scope.m.robot.angularSpeed(speeds[0],speeds[1],speeds[2]);
        $scope.m.robot.move(0, 0, -190);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonThreeController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false,
        speed: [90, 90, 90],
        move: [190, 0, 0]
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        var speeds = $scope.m.speed.map(function(num) { return Math.abs(parseInt(num, 10)) % 241; });
        var movement = $scope.m.move.map(function(num) { return parseFloat(num) % 361; });
        $scope.m.robot.angularSpeed(speeds[0],speeds[1],speeds[2]);
        $scope.m.robot.move(movement[0], movement[1], movement[2]);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonFourController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false,
        speed: [45, 0, 45],
        move: [-190, 0, 190]
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        var speeds = $scope.m.speed.map(function(num) { return Math.abs(parseInt(num, 10)) % 241; });
        var movement = $scope.m.move.map(function(num) { return parseFloat(num) % 361; });
        $scope.m.robot.angularSpeed(speeds[0],speeds[1],speeds[2]);
        $scope.m.robot.move(movement[0], movement[1], movement[2]);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonFiveController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false,
        speed: [90, 0, 90],
        move: [190, 0, 190]
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        var speeds = $scope.m.speed.map(function(num) { return Math.abs(parseInt(num, 10)) % 241; });
        var movement = $scope.m.move.map(function(num) { return parseFloat(num) % 361; });
        $scope.m.robot.angularSpeed(speeds[0],speeds[1],speeds[2]);
        $scope.m.robot.move(movement[0], movement[1], movement[2]);
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonSixController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false,
        speed: [90, 0, 1.89, 90],
        move: [240, 0, -1.89, 240]
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        var speeds = $scope.m.speed.map(function(num) { return Math.abs(parseFloat(num)) % 240; });
        var movement = $scope.m.move.map(function(num) { return parseFloat(num); });
        $scope.m.robot.angularSpeed(speeds[0],speeds[1], (speeds[2] * speeds[3]));
        $scope.m.robot.move(movement[0], movement[1], (movement[2] *  movement[3]));
        $scope.m.running = false;
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonSevenController', ['$scope', '$timeout', 'robotFactory', function($scope, $timeout, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
        $scope.m.robot.stop();
    }
    $scope.m = {
        displayAllCode: false,
        robot: null,
        running: false,
        radius: 0,
        ratio: 0,
        outsideDegrees: 0,
        insideDegrees: 0
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.stop();
        }
        robotFactory.unregister();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        $scope.m.robot.angularSpeed(90, 0, parseInt(90*$scope.m.ratio, 10));
        $scope.m.robot.move($scope.m.insideDegrees, movement[1], $scope.m.outsideDegrees);
        $scope.m.running = false;
    };
    $scope.radiusChange = function() {
        var radius = parseFloat($scope.m.radius);
        $scope.m.ratio = ((radius + (3.6975/2)) / (radius-(3.6975 / 2)));
        $scope.m.outsideDegrees = -((((radius + (3.6975)/2)/1.69)) *360);
        $scope.m.insideDegrees = ((((radius - (3.6975)/2)/1.69)) *360);
    };
    robotFactory.getRobots(setRobot, 1);
    $scope.radiusChange();
}]);
/**
 * Created by Adam on 3/2/2015.
 */
chapter3.directive('contenteditable', ['$sce', function($sce) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur change', function() {
                scope.$evalAsync(read);
            });
            read(); // initialize
            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if ( attrs.stripBr && html == '<br>' ) {
                    html = '';
                }
                if (isNaN(html)) {
                    html = parseFloat(html.replace(/[^0-9\.]+/g, ''));
                    if (isNan(html)) {
                        html = 0;
                    }
                    ngModel.$setViewValue(html);
                    element.html(html);
                } else {
                    ngModel.$setViewValue(html);
                }
            }
        }
    };
}]);
/**
 * Created by Adam on 3/2/2015.
 */
chapter3.factory('robotFactory', ['$interval', function($interval) {
    // Internal variables.
    var _intervalRef = null;
    var _num = 0;
    var _cb = function() {};
    var _robots = [];

    /* This function will fetch the robots once they are available. */
    function fetchRobots() {
        console.log('attempting robot acquisition');
        var acquired = Linkbots.acquire(_num);
        if (acquired.robots.length === _num) {
            _cb(acquired.robots);
            _robots = acquired.robots;
            $interval.cancel(_intervalRef);
            _intervalRef = null;
            return;
        } else if (acquired.robots.length > 0) {
            relinquish(acquired.robots);
        }
        if (_intervalRef === null) {
            _intervalRef = $interval(fetchRobots, 1000);
        }
    }

    function relinquish(robots) {
        if (robots.length > 0) {
            for (var i = 0; i < robots.length; i++) {
                Linkbots.relinquish(robots[i]);
            }
        }
    }

    /* If a change has occurred in the robot manager, reaquire the robots. */
    Linkbots.managerEvents.on('changed', function() {
        if (_robots.length > 0) {
            relinquish(_robots);
            _robots = [];
        }
        if (_num > 0) {
            fetchRobots();
        }
    });

    /**
     * Exported factory.
     */
    var robotFactory = {};

    robotFactory.getRobots = function(callback, number) {
        _cb = callback;
        _num = number;
        if (_robots.length == _num) {
            return _cb(_robots);
        } else if (_robots.length > 0) {
            relinquish(_robots);
            _robots = [];
            fetchRobots();
        } else {
            fetchRobots();
        }
    };
    robotFactory.unregister = function() {
        _cb = function() {};
        _num = 0;
        if (_intervalRef !== null) {
            $interval.cancel(_intervalRef);
            _intervalRef = null;
        }
    };
    return robotFactory;
}]);