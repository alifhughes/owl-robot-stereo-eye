function main () {

    var theata = 56;

    var distanceForward = 25;

    var distanceBetweenEyes = 6.5;

    var leftEyeLeftLimit = 1180;
    var rightEyeLeftLimit = 1200;
    var leftEyeRightLimit = 1850;
    var rightEyeRightLimit = 1890;

    // Loop forever
    while (true) {

        /**
         * As the counter increases
         *  - find each eye angle
         */

        // Theata starts at 56 degrees
        //  - the right most limit

        // Find the hype of first right eye triangle
        var hypeLength = distanceForward / Math.sin(theata * (Math.PI / 180));

        console.log('hypeLength ', hypeLength);

        // Find the base of first triangle
        var baseLength = Math.sqrt(Math.pow(hypeLength, 2) - Math.pow(distanceForward, 2));

        console.log('baseLength ', baseLength);

        if (theata > 90 && baseLength < distanceBetweenEyes) {
            console.log('theata', theata);
                // Get the total distance between eyes
                var totalBaseLength = distanceBetweenEyes - baseLength;

        } else if (theata > 90 && baseLength > distanceBetweenEyes)  {


            var totalBaseLength = distanceBetweenEyes - baseLength;
            totalBaseLength = totalBaseLength * -1;
        } else {

            // Theata is less than 90
            // Get the total distance between eyes
            var totalBaseLength = distanceBetweenEyes + baseLength;

        }

        console.log('totalBaseLength ', totalBaseLength);

        // find the left eye theata angle (angle from base line to eye vision
        var leftEyeTheataAngle = Math.atan(distanceForward / totalBaseLength) * (180 / Math.PI);

        console.log('leftEyeTheataAngle ', leftEyeTheataAngle);

        // Find the difference in angle between looking forward and left eye base theata angle
        var leftEyeOppTheataAngle = 90 - leftEyeTheataAngle;

        console.log('leftEyeOppTheataAngle ', leftEyeOppTheataAngle);

        // Convert that difference in left eye looking right to pwm
        var leftEyePwmInvert = convertAngleToPwm(leftEyeOppTheataAngle);

        console.log('leftEyePwmInvert ', leftEyePwmInvert);

        if (totalBaseLength < 6.5) {
            var leftEyePwmValue = 1520 + leftEyePwmInvert;
        } else {
           // Get the left eye pwm value
            var leftEyePwmValue = 1520 - leftEyePwmInvert;
        }

        rightEyeInvertAngle = 90 - theata;

        // Get the invert pwm value of right eye
        var rightEyePwmValueInvert = convertAngleToPwm(rightEyeInvertAngle);

        var rightEyePwmValue = 1545 - rightEyePwmValueInvert;

        console.log('Left Eye PWM value: ', leftEyePwmValue);
        console.log('Right eye PWM value: ', rightEyePwmValue);

        if (theata == 110){ break; }
        theata++;



    }
};

function findLeftEyeAngle(theata) {

    // find the angle between the base line
};

function convertAngleToPwm(angle) {
    var pwm = angle / 0.113;
    return pwm;
};

function convertPwmToAngle(Pwm) {
    var angle = pwm * 0.113;
    return angle;
}
main();

function yo () {
    console.log('1time');

    // Find the difference in angle between looking forward and left eye base theata angle
    var leftEyeOppTheataAngle = 90 + leftEyeTheataAngle;

    console.log('leftEyeOppTheataAngle ', leftEyeOppTheataAngle);

    // Convert that difference in left eye looking right to pwm
    var leftEyePwmInvert = convertAngleToPwm(leftEyeOppTheataAngle);

    console.log('leftEyePwmInvert ', leftEyePwmInvert);

    // Get the left eye pwm value
    var leftEyePwmValue = 1520 + leftEyePwmInvert;

    rightEyeInvertAngle = 90 + theata;

    // Get the invert pwm value of right eye
    var rightEyePwmValueInvert = convertAngleToPwm(rightEyeInvertAngle);

    var rightEyePwmValue = 1545 + rightEyePwmValueInvert;

}
