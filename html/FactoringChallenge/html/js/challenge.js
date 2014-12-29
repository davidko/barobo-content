/* global Serenade, $ */
/* jshint  newcap: false */

$(function () {
    "use strict";

    var
        redRobot,
        blueRobot,

        ctrl = {
            leftClick: function (_, o) {
                zeClicken(redRobot, o);
            },
            rightClick: function (_, o) {
                zeClicken(blueRobot, o);
            },
            discon: function (_, o) {
                if (redRobot) {
                  redRobot.color(0,255,0);
                  //redRobot.disconnect();
                  o.redConnected = false;
                  o.rightDisabled = true;
                }
                if (blueRobot) {
                  blueRobot.color(0,255,0);
                  //blueRobot.disconnect();
                  o.blueConnected = false;
                  o.leftDisabled = true;
                }
            },
            connect: function (_, o) {
                // Be idempotent
                if (redRobot && blueRobot) {
                  return true;
                }
                var acq;
                ctrl.discon(null, o);
                acq = Linkbots.acquire(2);
                if (acq.robots.length == 2) {
                  // yay robots
                  o.badConnection = false;
                  redRobot = acq.robots[0];
                  var btnA = redRobot.BUTTON_A;
                  var btnB = redRobot.BUTTON_B;
                  redRobot.register({
                      button: {
                          btnA: {
                              callback: zeClicken,
                              data: model
                          },
                          btnB: {
                              callback: zeClicken,
                              data: model
                          }
                      },
                      wheel: {
                          1: {
                              distance: 20,
                              callback: changeValue,
                              data: model
                          },
                          3: {
                              distance: 20,
                              callback: changeValue,
                              data: model
                          }
                      }
                  });
                  redRobot.color(255,0,0);
                  o.redConnected = true;
                  o.rightDisabled = false;
                  o.redId = redRobot._id;
                  blueRobot = acq.robots[1];
                  blueRobot.register({
                        button: {
                            btnA: {
                                callback: zeClicken,
                                    data: model
                            },
                            btnB: {
                                callback: zeClicken,
                                    data: model
                            }
                        },
                        wheel: {
                            1: {
                                distance: 20,
                                    callback: changeValue,
                                    data: model
                            },
                            3: {
                                distance: 20,
                                    callback: changeValue,
                                    data: model
                            }
                        }
                  });
                  blueRobot.color(0,0,255);
                  o.blueConnected = true;
                  o.leftDisabled = false;
                  o.blueId = blueRobot._id;
                  }
                else {
                  // Sad robots
                  o.badConnection = true;
                }

            },
            startOver: function (_, o) {
                var newNumber = giveMeNumber(4,100);
                o.topNumbers.update([newNumber]);
                o.topNumber = newNumber;
                resetGame(o, newNumber);
            }
        },

        model = new Serenade({
            topNumbers: new Serenade.Collection([]),
            topNumber: '',
            rightVal: null,
            leftVal: null,
            leftDisabled: true,
            rightDisabled: true,
            leftFailed: false,
            rightFailed: false,
            leftSuccess: false,
            rightSuccess: false,
            totalSuccess: false,
            hasRobots: true,
            blueConnected: false,
            redConnected: false,
            redId: "",
            blueId: "",
            badConnection: false
        });

    function giveMeNumber (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function isPrime (n) {
        var i;
        for (i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    function proceed (o) {
        var min, max, next;
        if (o.leftVal <= o.rightVal) {
            min = o.leftVal;
            max = o.rightVal;
        }
        else {
            min = o.rightVal;
            max = o.leftVal;
        }

        if (!isPrime(max)) {
            next = max;
        }
        else if (!isPrime(min)) {
            next = min;
        }
        else {
            ctrl.startOver(null, o);
            return;
        }

        o.topNumbers.push(next);
        o.topNumber = o.topNumbers.join(' -> ');
        resetGame(o, next);
    }

    function resetGame (o, n) {
        o.leftVal = giveMeNumber(2, 2*n/3);
        o.rightVal = giveMeNumber(2,2*n/3);
        o.leftDisabled = false;
        o.rightDisabled = false;
        o.leftSuccess = false;
        o.rightSuccess = false;
        o.totalSuccess = false;
    }

    function zeClicken (robot, o) {
        var robID = robot._id;
        var top = model.topNumbers.last,
            val, otherVal, success, disabled, halfDone, fail;
        if (robID === o.blueId) {
            val = 'leftVal';
            otherVal = 'rightVal';
            disabled = 'leftDisabled';
            success = 'leftSuccess';
            halfDone = model.rightSuccess;
            fail = 'leftFailed';
        }
        else {
            val = 'rightVal';
            otherVal = 'leftVal';
            disabled = 'rightDisabled';
            success = 'rightSuccess';
            halfDone = model.leftSuccess;
            fail = 'rightFailed';
        }
        if (!model[disabled]) {
            if (halfDone && Math.abs(model[val] * model[otherVal] - top) < 0.001) {
                model[disabled] = true;
                model[success] = true;
                model.totalSuccess = true;
                setTimeout(function () { proceed(model); }, 1500);
            }
            else if (!halfDone && Math.abs(top % model[val]) < 0.001) {
                model[fail] = false;
                model[disabled] = true;
                model[success] = true;
            }
            else {
                model[fail] = true;
                model[disabled] = true;
                setTimeout(function () {
                    model[fail] = false;
                    model[disabled] = false;
                }, 1000);
            }
        }
    }

    var scrollUp = function (robID, o) {
        if (robID === o.blueId) {
          if (!model.leftDisabled) {
              model.leftVal++;
          }
        }
        else {
          if (!model.rightDisabled) {
              model.rightVal++;
          }
        }
    };
    var scrollDown = function (robID, o) {
        if (robID === o.blueId) {
            if (!model.leftDisabled) {
                if (model.leftVal > 1.5) {
                    model.leftVal--;
                }
            }
        }
        else {
            if (!model.rightDisabled) {
                if (model.rightVal > 1.5) {
                    model.rightVal--;
                }
            }
        }
    };

    var changeValue = function(robot, o, event) {
      if (event.difference > 0) {
        scrollUp(robot._id, o);
      }
      else {
        scrollDown(robot._id, o);
      }
    };

    var callbacks = {
      button: {
        0: {
          callback: zeClicken,
          data: model
        },
        1: {
          callback: zeClicken,
          data: model
        }
      },
      wheel: {
        1: {
          distance: 20,
          callback: changeValue,
          data: model
        },
        3: {
          distance: 20,
          callback: changeValue,
          data: model
        }
      }
    };

    ctrl.startOver(null, model);
    $("#challengeApp").replaceWith(Serenade.render('app', model, ctrl));
    document.body.appendChild(Linkbots.managerElement());
});
