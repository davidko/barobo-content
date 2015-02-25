/**
 * Created by Adam on 2/14/2015.
 */
var chapter2 = angular.module('chapter2', ['ngRoute', 'ui.bootstrap', 'hljs', 'ngSanitize']);

chapter2.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
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
    }).when('/lesson-seven-a', {
        controller: 'lessonSevenAController',
        templateUrl: 'views/lesson-seven-a.html'
    }).when('/lesson-seven-b', {
        controller: 'lessonSevenBController',
        templateUrl: 'views/lesson-seven-b.html'
    }).when('/lesson-seven-c', {
        controller: 'lessonSevenCController',
        templateUrl: 'views/lesson-seven-c.html'
    }).otherwise({ redirectTo: '/'});
    
}]);
/**
 * Created by Adam on 2/14/2015.
 */
chapter2.controller('lessonOneController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var intervalRef = null;
    function stopAcquisition() {
        $interval.cancel(intervalRef);
        intervalRef = null;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        $scope.m.robot = robotFactory.getRobot1();
        if ($scope.m.robot !== null) {
            stopAcquisition();
            $scope.m.robotId = $scope.m.robot.id;
        }
    }
    $scope.m = {
        buzzerFrequency: 1046.5,
        sleep1: 1.5,
        sleep2: 3,
        led1: 255,
        led2: 0,
        led3: 0,
        robotId: '',
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.change = function(e) {
        console.log(e.target);
        console.log('Buzzer frequencey: ' + $scope.m.buzzerFrequency);
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        var freq, sleep1, sleep2, led1, led2, led3;
        freq = parseFloat($scope.m.buzzerFrequency);
        sleep1 = parseFloat($scope.m.sleep1) * 1000;
        sleep2= parseFloat($scope.m.sleep2) * 1000;
        led1 = parseFloat($scope.m.led1);
        led2 = parseFloat($scope.m.led2);
        led3 = parseFloat($scope.m.led3);
        $scope.m.running = true;
        $scope.m.robot.buzzerFrequency(freq);
        $timeout(function() {
            $scope.m.robot.buzzerFrequency(0);
            $timeout(function() {
                $scope.m.robot.color(led1, led2, led3);
                $scope.m.running = false;
            }, sleep2);
        }, sleep1);
        console.log('Run Clicked');
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    if ($scope.m.robot === null) {
        intervalRef = $interval(getRobot, 1000);
    }
}]).controller('lessonTwoController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var intervalRef = null;
    var counter = 0;
    function stopAcquisition() {
        $interval.cancel(intervalRef);
        intervalRef = null;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        $scope.m.robot = robotFactory.getRobot1();
        if ($scope.m.robot !== null) {
            stopAcquisition();
            $scope.m.robotId = $scope.m.robot.id;
        }
    }
    function runLoop(led1, led2, led3, sleep1, sleep2) {
        $scope.m.robot.color(led1, led2, led3);
        $timeout(function() {
            $scope.m.robot.color(0, 0, 0);
            $timeout(function() {
                counter--;
                if (counter > 1) {
                    runLoop(led1, led2, led3, sleep1, sleep2);
                } else {
                    $scope.m.running = false;
                }
            }, sleep2);
        }, sleep1);
    }
    $scope.m = {
        sleep1: 0.25,
        sleep2: 0.25,
        led1: 255,
        led2: 0,
        led3: 0,
        robotId: '',
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        counter = 10;
        var sleep1, sleep2, led1, led2, led3;
        sleep1 = parseFloat($scope.m.sleep1) * 1000;
        sleep2= parseFloat($scope.m.sleep2) * 1000;
        led1 = parseFloat($scope.m.led1);
        led2 = parseFloat($scope.m.led2);
        led3 = parseFloat($scope.m.led3);
        $scope.m.running = true;
        runLoop(led1, led2, led3, sleep1, sleep2);
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    if ($scope.m.robot === null) {
        intervalRef = $interval(getRobot, 1000);
    }
}]).controller('lessonThreeController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var intervalRef = null;
    var counter = 0;
    function stopAcquisition() {
        $interval.cancel(intervalRef);
        intervalRef = null;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        $scope.m.robot = robotFactory.getRobot1();
        if ($scope.m.robot !== null) {
            stopAcquisition();
            $scope.m.robotId = $scope.m.robot.id;
        }
    }
    function runLoop(sleep2, sleep3, sleep4) {
        $scope.m.robot.color(255, 0, 0);
        $timeout(function() {
            $scope.m.robot.color(0, 0, 0);
            $timeout(function() {
                $scope.m.robot.color(0, 0, 255);
                $timeout(function() {
                    counter--;
                    if (counter > 1) {
                        runLoop(sleep2, sleep3, sleep4);
                    } else {
                        $scope.m.running = false;
                    }
                }, sleep4);
            }, sleep3);
        }, sleep2);
    }
    $scope.m = {
        sleep1: 3,
        sleep2: 0.5,
        sleep3: 0.5,
        sleep4: 0.5,
        robotId: '',
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        sleep1 = parseFloat($scope.m.sleep1) * 1000;
        sleep2= parseFloat($scope.m.sleep2) * 1000;
        sleep3= parseFloat($scope.m.sleep3) * 1000;
        sleep4= parseFloat($scope.m.sleep4) * 1000;
        $scope.m.running = true;
        $scope.m.robot.color(0, 255, 0);
        counter = 6;
        $timeout(function() {
            runLoop(sleep2, sleep3, sleep4);
        }, sleep1);
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    if ($scope.m.robot === null) {
        intervalRef = $interval(getRobot, 1000);
    }
}]).controller('lessonFourController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var intervalRef = null;
    function stopAcquisition() {
        $interval.cancel(intervalRef);
        intervalRef = null;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        $scope.m.robot = robotFactory.getRobot1();
        if ($scope.m.robot !== null) {
            stopAcquisition();
            $scope.m.robotId = $scope.m.robot.id;
        }
    }
    $scope.m = {
        mph: 30,
        robotId: '',
        yellow_time: 0,
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.mphChange = function() {
        $scope.m.yellow_time = (1.467 * $scope.m.mph) / 15.0 + 1.5;
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    if ($scope.m.robot === null) {
        intervalRef = $interval(getRobot, 1000);
    }
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        var timer = ((1.467 * parseFloat($scope.m.mph)) / 15.0 + 1.5) * 1000;
        $scope.m.robot.color(0, 255, 0);
        $timeout(function() {
            $scope.m.robot.color(255, 255, 0);
            $timeout(function() {
                $scope.m.robot.color(255, 0, 0);
                $scope.m.running = false;
            }, timer);
        }, 3000);
    };
    $scope.mphChange();
}]).controller('lessonFiveController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var intervalRef = null;
    function stopAcquisition() {
        $interval.cancel(intervalRef);
        intervalRef = null;
        if ($scope.m.robot !== null) {
            $scope.m.robot.unregister();
        }
        $scope.m.running = false;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        $scope.m.robot = robotFactory.getRobot1();
        if ($scope.m.robot !== null) {
            stopAcquisition();
            $scope.m.robotId = $scope.m.robot.id;
        }
    }
    $scope.m = {
        led1: 0,
        led2: 255,
        led3: 0,
        robotId: '',
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        $scope.m.robot.color(255, 0, 0);
        var regObj = { button: {} };
        regObj.button[$scope.m.robot.BUTTON_A] = {
            callback: function() {
                var red = parseInt($scope.m.led1);
                var green = parseInt($scope.m.led2);
                var blue = parseInt($scope.m.led3);
                $scope.m.robot.color(red, green, blue);
            }
        };
        $scope.m.robot.register(regObj);
    };
    if ($scope.m.robot === null) {
        intervalRef = $interval(getRobot, 1000);
    }
}]).controller('lessonSixController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var intervalRef = null;
    function stopAcquisition() {
        $interval.cancel(intervalRef);
        intervalRef = null;
        if ($scope.m.robot !== null) {
            $scope.m.robot.unregister();
        }
        $scope.m.running = false;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        $scope.m.robot = robotFactory.getRobot1();
        if ($scope.m.robot !== null) {
            stopAcquisition();
            $scope.m.robotId = $scope.m.robot.id;
        }
    }
    $scope.m = {
        robotId: '',
        displayAllCode: false,
        robot: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    $scope.run = function() {
        if ($scope.m.robot === null) {
            return;
        }
        $scope.m.running = true;
        $scope.m.robot.stop();
        var regObj = {
            wheel: {
                0: {
                    distance: 1,
                    callback: function(robot, data, event) {
                        var val = event.position % 360;
                        while (val < 0) {
                            val = 360 + val;
                        }
                        val = parseInt((val / 360) * 255);
                        $scope.m.robot.color(val, 0, 0);
                    }
                }
            }
        };
        $scope.m.robot.register(regObj);
    };
    if ($scope.m.robot === null) {
        intervalRef = $interval(getRobot, 1000);
    }
}]).controller('lessonSevenAController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {


}]).controller('lessonSevenBController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {


}]).controller('lessonSevenCController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {


}]);

/**
 * Created by Adam on 2/22/2015.
 */
chapter2.directive('contenteditable', ['$sce', function($sce) {
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
 * Created by Adam on 2/22/2015.
 */
chapter2.factory('robotFactory', [function() {
    var robot1 = null;
    var robot2 = null;
    var robotFactory = {};
    robotFactory.getRobot1 = function() {
        if (robot1 === null) {
            var acquired = Linkbots.acquire(1);
            if (acquired.robots.length === 1) {
                robot1 = acquired.robots[0];
            }
        }
        return robot1;
    };
    robotFactory.getRobot2 = function() {
        if (robot2 === null) {
            var acquired = Linkbots.acquire(1);
            if (acquired.robots.length === 1) {
                robot2 = acquired.robots[0];
            }
        }
        return robot2;
    };

    return robotFactory;
}]);