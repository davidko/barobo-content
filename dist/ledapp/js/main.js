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
    function setRobot(robots) {
        $scope.m.robot = robots[0];
    }
    $scope.m = {
        buzzerFrequency: 1046.5,
        sleep1: 1.5,
        sleep2: 3,
        led1: 255,
        led2: 0,
        led3: 0,
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
        robotFactory.unregister();
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonTwoController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var counter = 0;
    function setRobot(robots) {
        $scope.m.robot = robots[0];
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
        robotFactory.unregister();
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonThreeController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var counter = 0;
    function setRobot(robots) {
        $scope.m.robot = robots[0];
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
        led1: [0, 255, 0],
        cnt: 6,
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
        var led1 = $scope.m.led1.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        $scope.m.running = true;
        $scope.m.robot.color(led1[0], led1[1], led1[2]);
        counter = Math.abs(parseInt($scope.m.cnt, 10)) % 20;
        $timeout(function() {
            runLoop(sleep2, sleep3, sleep4);
        }, sleep1);
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        robotFactory.unregister();
    };
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonFourController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
    }
    $scope.m = {
        mph: 30,
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
    $scope.stopAcquisition = function() {
        robotFactory.unregister();
    };
    robotFactory.getRobots(setRobot, 1);
    $scope.mphChange();
}]).controller('lessonFiveController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
    }
    function stopAcquisition() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.unregister();
        }
        robotFactory.unregister();
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
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonSixController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot = robots[0];
    }
    function stopAcquisition() {
        if ($scope.m.robot !== null) {
            $scope.m.robot.unregister();
        }
        robotFactory.unregister();
        $scope.m.running = false;
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
    robotFactory.getRobots(setRobot, 1);
}]).controller('lessonSevenAController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    function setRobot(robots) {
        $scope.m.robot1 = robots[0];
        $scope.m.robot2 = robots[1];
    }
    var counter = 0;
    function stopAcquisition() {
        robotFactory.unregister();
        $scope.m.running = false;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        if ($scope.m.robot1 === null) {
            $scope.m.robot1 = robotFactory.getRobot1();
            if ($scope.m.robot1 !== null) {
                $scope.m.robotId1 = $scope.m.robot1.id;
            }
        }
        if ($scope.m.robot1 === null) {
            $scope.m.robot1 = robotFactory.getRobot2();
            if ($scope.m.robot2 !== null) {
                $scope.m.robotId2 = $scope.m.robot2.id;
            }
        }
        if ($scope.m.robot1 !== null && $scope.m.robot2 !== null) {
            stopAcquisition();
        }
    }
    function runLoop(led1, led2, led3, led4) {
        $scope.m.robot1.color(led1[0], led1[1], led1[2]);
        $scope.m.robot2.color(led2[0], led2[1], led2[2]);
        $timeout(function() {
            $scope.m.robot1.color(0, 0, 0);
            $scope.m.robot2.color(0, 0, 0);
            $timeout(function() {
                $scope.m.robot1.color(led3[0], led3[1], led3[2]);
                $scope.m.robot2.color(led4[0], led4[1], led3[2]);
                $timeout(function() {
                    counter--;
                    if (counter > 1) {
                        runLoop(led1, led2, led3, led4);
                    } else {
                        $scope.m.running = false;
                    }
                }, 500);
            }, 500);
        }, 500);
    }
    $scope.m = {
        led1: [255, 0, 0],
        led2: [255, 0, 0],
        led3: [0, 0, 255],
        led4: [0, 0, 255],
        count: 8,
        displayAllCode: false,
        robot1: null,
        robot2: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    $scope.run = function() {
        if ($scope.m.robot1 === null || $scope.m.robot2 === null) {
            return;
        }
        $scope.m.running = true;
        var led1 = $scope.m.led1.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led2 = $scope.m.led2.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led3 = $scope.m.led3.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led4 = $scope.m.led4.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        counter = Math.abs(parseInt($scope.m.count, 10)) % 26;
        runLoop(led1, led2, led3, led4);
    };
    robotFactory.getRobots(setRobot, 2);
}]).controller('lessonSevenBController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var counter = 0;
    function setRobot(robots) {
        $scope.m.robot1 = robots[0];
        $scope.m.robot2 = robots[1];
    }
    function stopAcquisition() {
        robotFactory.unregister();
        $scope.m.running = false;
    }
    function runLoop(led1, led2, led3, led4, led5, led6, sleep1, sleep2) {
        $scope.m.robot1.color(led1[0], led1[1], led1[2]);
        $scope.m.robot2.color(led2[0], led2[1], led2[2]);
        $timeout(function() {
            $scope.m.robot1.color(led3[0], led3[1], led3[2]);
            $scope.m.robot2.color(led4[0], led4[1], led3[2]);
            $timeout(function() {
                counter--;
                if (counter > 1) {
                    runLoop(led1, led2, led3, led4, led5, led6);
                } else {
                    $scope.m.robot1.color(led5[0], led5[1], led5[2]);
                    $scope.m.robot2.color(led6[0], led6[1], led6[2]);
                    $scope.m.running = false;
                }
            }, sleep1);
        }, sleep2);
    }
    $scope.m = {
        led1: [255, 0, 0],
        led2: [0, 0, 0],
        led3: [0, 0, 0],
        led4: [255, 0, 0],
        led5: [0, 0, 255],
        led6: [0, 0, 255],
        sleep1: 0.5,
        sleep2: 0.5,
        count: 8,
        displayAllCode: false,
        robot1: null,
        robot2: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    $scope.run = function() {
        if ($scope.m.robot1 === null || $scope.m.robot2 === null) {
            return;
        }
        $scope.m.running = true;
        var led1 = $scope.m.led1.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led2 = $scope.m.led2.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led3 = $scope.m.led3.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led4 = $scope.m.led4.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led5 = $scope.m.led4.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led6 = $scope.m.led4.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var sleep1 = parseInt($scope.m.sleep1, 10) * 1000;
        var sleep2 = parseInt($scope.m.sleep2, 10) * 1000;
        counter = Math.abs(parseInt($scope.m.count, 10)) % 36;
        runLoop(led1, led2, led3, led4, led5, led6, sleep1, sleep2);
    };
    robotFactory.getRobots(setRobot, 2);

}]).controller('lessonSevenCController', ['$scope', '$timeout', '$interval', 'robotFactory', function($scope, $timeout, $interval, robotFactory) {
    var ctr1 = 0, ctr2 = 0, ctr3 = 0;
    function setRobot(robots) {
        $scope.m.robot1 = robots[0];
        $scope.m.robot2 = robots[1];
    }
    function stopAcquisition() {
        robotFactory.unregister();
        $scope.m.running = false;
    }
    function getRobot() {
        console.log('attempting robot acquisition');
        if ($scope.m.robot1 === null) {
            $scope.m.robot1 = robotFactory.getRobot1();
            if ($scope.m.robot1 !== null) {
                $scope.m.robotId1 = $scope.m.robot1.id;
            }
        }
        if ($scope.m.robot1 === null) {
            $scope.m.robot1 = robotFactory.getRobot2();
            if ($scope.m.robot2 !== null) {
                $scope.m.robotId2 = $scope.m.robot2.id;
            }
        }
        if ($scope.m.robot1 !== null && $scope.m.robot2 !== null) {
            stopAcquisition();
        }
    }
    function runBlock1() {
        ctr1--;
        if (ctr3 > 1) {
            ctr2 = 4;
            ctr3 = 3;
            runBlock2();
        } else {
            $scope.m.robot1.color(0, 0, 255);
            $scope.m.robot2.color(0, 0, 255);
        }
    }
    function runBlock3() {
        var led5 = $scope.m.led5.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led6 = $scope.m.led6.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        $scope.m.robot1.color(led5[0], led5[1], led5[2]);
        $scope.m.robot2.color(led6[0], led6[1], led6[2]);
        $timeout(function() {
            $scope.m.robot1.color(0, 0, 0);
            $scope.m.robot2.color(0, 0, 0);
            $timeout(function() {
                ctr3--;
                if (ctr3 > 1) {
                    runBlock3();
                } else {
                    $timeout(runBlock1, 1000);
                }
            }, 500);
        }, 500);
    }
    function runBlock2() {
        var led1 = $scope.m.led1.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        var led2 = $scope.m.led2.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
        $scope.m.robot1.color(led1[0], led1[1], led1[2]);
        $scope.m.robot2.color(led2[0], led2[1], led2[2]);
        $timeout(function() {
            $scope.m.robot1.color(0, 0, 0);
            $scope.m.robot2.color(0, 0, 0);
            $timeout(function() {
                ctr2--;
                if (ctr2 > 1) {
                    runBlock2();
                } else {
                    var led3 = $scope.m.led3.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
                    var led4 = $scope.m.led4.map(function(num) { return Math.abs(parseInt(num, 10)) % 256; });
                    $scope.m.robot1.color(led3[0], led3[1], led3[2]);
                    $scope.m.robot2.color(led4[0], led4[1], led4[2]);
                    $timeout(runBlock3, 2000);
                }
            }, 500);
        }, 500);
        
    }
    $scope.m = {
        led1: [255, 0, 0],
        led2: [0, 0, 0],
        led3: [255, 0, 0],
        led4: [0, 0, 0],
        led5: [0, 0, 0],
        led6: [255, 0, 0],
        displayAllCode: false,
        robot1: null,
        robot2: null,
        running: false
    };
    $scope.toggle = function() {
        $scope.m.displayAllCode = !$scope.m.displayAllCode;
    };
    $scope.stopAcquisition = function() {
        stopAcquisition();
    };
    $scope.run = function() {
        if ($scope.m.robot1 === null || $scope.m.robot2 === null) {
            return;
        }
        $scope.m.running = true;
        ctr1 = 5;
        runBlock1();
    };
    robotFactory.getRobots(setRobot, 2);

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
chapter2.factory('robotFactory', ['$interval', function($interval) {
    var robot1 = null;
    var robot2 = null;

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
            for (var i = 0; i < acquired.robots.length; i++) {
                Linkbots.relinquish(acquired.robots[i]);
            }
        }
        if (_intervalRef === null) {
            _intervalRef = $interval(fetchRobots, 1000);
        }
    }
    
    /* This function relinquishes the robots */
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