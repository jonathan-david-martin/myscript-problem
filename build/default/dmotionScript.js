var xAccel = 0;
var yAccel = 0;
var zAccel = 0;

var xDot;

function setup() {
    if(window.DeviceOrientationEvent){
        var cnv = createCanvas(800, 800);
        cnv.position(400, 60);
        cnv.parent('graph-div');
        //cnv.style('display', 'block');
    }


}

function draw() {
    // fill(255,255,255,4);
    // rect(0,0,400,400);
    //
    // stroke(0,0,0,100);
    fill(255, 0, 0,60);
    ellipse(100, 400 - xAccel * 40, 10, 10);

    fill(0, 255, 0,15);
    ellipse(200, 400 + yAccel * 40, 10, 10);

    fill(0, 0, 255,15);
    ellipse(300, 400 - zAccel * 40, 10, 10);
}

if (!('ondeviceorientation' in window)) {
    document.getElementById('do-unsupported').classList.remove('hidden');
} else {
    document.getElementById('do-info').classList.remove('hidden');

    window.addEventListener('deviceorientation', function (event) {
        document.getElementById('cube').style.webkitTransform =
            document.getElementById('cube').style.transform =
                'rotateX(' + event.beta + 'deg) ' +
                'rotateY(' + event.gamma + 'deg) ' +
                'rotateZ(' + event.alpha + 'deg)';

        document.getElementById('beta').innerHTML = Math.round(event.beta);
        document.getElementById('gamma').innerHTML = Math.round(event.gamma);
        document.getElementById('alpha').innerHTML = Math.round(event.alpha);
        document.getElementById('is-absolute').innerHTML = event.absolute ? "true" : "false";
    });
}

if (!('ondevicemotion' in window)) {
    document.getElementById('dm-unsupported').classList.remove('hidden');
} else {
    document.getElementById('dm-info').classList.remove('hidden');

    window.addEventListener('devicemotion', function (event) {
        xAccel = event.acceleration.x;
        yAccel = event.acceleration.y;
        zAccel = event.acceleration.z;

        document.getElementById('acceleration-x').innerHTML = (event.acceleration.x).toFixed(1);
        document.getElementById('acceleration-y').innerHTML = (event.acceleration.y).toFixed(1);
        document.getElementById('acceleration-z').innerHTML = (event.acceleration.z).toFixed(1);

        document.getElementById('acceleration-including-gravity-x').innerHTML =
            Math.round(event.accelerationIncludingGravity.x);
        document.getElementById('acceleration-including-gravity-y').innerHTML =
            Math.round(event.accelerationIncludingGravity.y);
        document.getElementById('acceleration-including-gravity-z').innerHTML =
            Math.round(event.accelerationIncludingGravity.z);

        document.getElementById('rotation-rate-beta').innerHTML = Math.round(event.rotationRate.beta);
        document.getElementById('rotation-rate-gamma').innerHTML = Math.round(event.rotationRate.gamma);
        document.getElementById('rotation-rate-alpha').innerHTML = Math.round(event.rotationRate.alpha);

        document.getElementById('interval').innerHTML = event.interval;
    });
}

// if (!('oncompassneedscalibration' in window)) {
//     document.getElementById('cnc-unsupported').classList.remove('hidden');
// } else {
//     window.addEventListener('compassneedscalibration', function (event) {
//         alert('Compass needs calibrating! Wave your device in a figure-eight motion');
//     });
// }