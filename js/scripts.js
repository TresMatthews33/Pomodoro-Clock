$(function() {
    let clock = new Clock();
    clock.displayCurrentTime();
    clock.displaySessionTime();
    clock.displayBreakTime();
    clock.displaySessionCount();

    //Event Listeners
    $(".time-session .plus").click(function() {
        clock.changeSessionTime("add");
    });
    $(".time-session .minus").click(function() {
        clock.changeSessionTime("subtract");
    });

    $(".time-break .plus").click(function() {
        clock.changeSessionTime("add");
    });
    $(".time-break .minus").click(function() {
        clock.changeSessionTime("subtract");
    });
});

function Clock() {

    var startTime = 1500, //Starting value for our time
        currentTime = 1500,
        sessionTime = 1500,
        breakTime = 300,
        mode = "session",
        active = false; //Keeps track of if clock is running


    //Function to convert a number of seconds into a formatted time string
    function formatTime(secs) {
        var result = "";
        let seconds = secs % 60;
        let minutes = parseInt(secs / 60) % 60;
        let hours = parseInt(secs / 3600);

        function addLeadingZeros(time) {
            if (time < 10) {
              return "0" + time;
            } else {
              return time;
            }
        }

        if (hours > 0) {
            result += (hours + ":");
        }

        result += (addLeadingZeros(minutes) + ":" +addLeadingZeros( seconds));

        return result;
    }
    this.displayCurrentTime = function() {
        $('.main-display').text(formatTime(currentTime));
    }

    //Session time
    this.displaySessionTime = function () {
        $('.time-session-display').text(parseInt(sessionTime / 60) + "min");
    }

    //Break time
    this.displayBreakTime = function () {
        $('.time-session-display').text(parseInt(breakTime / 60) + "min");
    }

    //Function to control the session count
    this.displaySessionCount = function() {
        //If our count is 0, the text should say Pomodoro Clock
        if (sessionCount === 0) {
            $('.seession-count').html("<h2>Pomodoro Clock</h2>");
        }else if (mode === "Session") {
        //If its greater than 0, we should show the amount of sessions
        $('.session-count').html("<h2>Session " + sessionCount + "</h2>");
        } else if (mode === "Break") {
        //If in  a break, it should say break
        $('.session-count').html("<h2>Break</h2>");
        }
    }
    //Change the time functions

    this.changeSessionTime = function () {
        if (!active) {
            if (command === "add") {
                sessionTime += 60;
            } else if (sessionTime > 60) {
                sessionTime -= 60;
            }
            currentTime = sessionTime;
            startTime = sessionTime;
            this.displaySessionTime();
            this.displayCurrentTime();
        }
    }

    this.changeBreakTime = function(command) {
        if (!active) {
            if (command === "add") {
                breakTime =+ 60;
            } else if (breakTime> 60) {
                breakTime -= 60;
            }
            this.displayBreakTime()
        }
    }
}