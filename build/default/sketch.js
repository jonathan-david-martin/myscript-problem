/* this is the js code from sketch.js
First quadrant only
using translate and scaling the canvas

*/


//midi sequence (221 2221)
let midiNotes = [48,50,52,53,55,57,59,/**/ 60,62,64,65,67,69,71,/**/72,74,76,77,79,81,83,/**/84,86,88,89,91,93,95,/**/
    96,98,100,101,103,105,107];

let noteIndex = 0;
let midiVal, freq;
var xCoord = 30
var yCoord =180
var brushWidth=30
var div = 40;

//program to pick coordinates from grid

var i = 0;
var j = 0;
var points = [];
var tempX = 0;
var tempY = 0;
var counter = 0;
var duplicates = false;
var coord_text = "";
var vertSlider;
var horSlider;
var horValue = 0;
var button;
var timeStamp = 0;

var osc;


function redrawGrid(){
    points = [];
    timeStamp = frameCount;
    console.log('redraw');
}

function drawGrid(){
    background(255);

    textSize(20);

    stroke(0,0,0);
    push();
    translate(-400,0);
    scale(2);
    //horz & vert gridlines
    for (let i=0;i<400;i++){
        line(i*div,j,i*div,j+400);
    }
    i=0;
    for (let j=0;j<400;j++){
        line(i,j*div,i+400,j*div);
    }

    stroke(255, 0, 0);
    strokeWeight(1);
    line(0,200,400,200);
    line(200,0,200,400);
    //strokeWeight(2);

    stroke(0, 0, 0);
    textSize(18);
    fill(0, 0, 0);
    text("(sec)",360,191);
    text("-X",5,191);
    text("(inches)",202,20);
    text("-Y",207,394);
    pop();
}

function setup() {

    osc2 = new p5.TriOsc();
    env2 = new p5.Envelope();

    strokeWeight(1);
    stroke(0, 0, 0);
    var cnv = createCanvas(400, 400);
    cnv.parent('sketch-div');
    cnv.style('display', 'block');
    cnv.position(80,0);

    osc = new p5.Oscillator();
    osc.setType('square');
    osc.freq(300);
    osc.amp(0.05);

    drawGrid();

    vertSlider = createSlider(0, 5, 0,1);
    vertSlider.value(5);

    var sliderColR = color(255,0,0);

    var sliderOutline = color(255,255,255);
    //rSlider.style('fill', sliderColR);
    //rSlider.style('stroke', sliderColR);
    vertSlider.style('background-color', sliderColR);
    //rSlider.style('outline', sliderColR);
    vertSlider.style('-webkit-appearance', 'none');
    vertSlider.style('-webkit-transform', 'rotate(90deg)');
    vertSlider.style('width', '400px');
    vertSlider.position(-130, 190);
    vertSlider.parent('sketch-div');



    noStroke();
    textSize(17);
    fill(255, 0, 0);

    textSize(20);
    stroke(0,0,0);
    strokeWeight(1);
    fill(0, 0, 0);
    //slider parameters: min, max, value, step

    /*
    vertSlider = createSlider(0, 5, 0,1);
    vertSlider.parent('sketch-div');
    vertSlider.id('vertSlider');
    vertSlider.position(0, 10);
    vertSlider.style('height', '400px');
    vertSlider.style('-webkit-appearance', 'none');
    //vertSlider.style('-webkit-transform', 'rotate(90deg)');

    var sliderColR = color(255,0,0);

    var sliderOutline = color(255,255,255);

    vertSlider.style('background-color', sliderColR);
    vertSlider.style('outline', sliderOutline);
*/

    horSlider = createSlider(0, 5, 0,1);
    horSlider.parent('sketch-div');
    horSlider.id('horSlider');
    horSlider.position(80, 410);
    horSlider.style('width', '420px');

};


function draw() {
    horValue = horSlider.value();

    if(frameCount - timeStamp < 200 && timeStamp !=0) {
        if (frameCount % 40 === 0) {
            horSlider.value(horValue += 1);
            //we are using a slider max value of 5
            //and the quadrant is 200 x 200
            drawPoints(horSlider.value() * 40+200, vertSlider.value() * 40);

            midiVal = midiNotes[(5-vertSlider.value()) % midiNotes.length];
            freq = midiToFreq(midiVal);
            osc2.freq(freq);
            env2.ramp(osc2, 0, 1.0, 0);
            osc2.start();

            //Play next note
            noteIndex++;
        }
    }
    else{
        horSlider.value(0);
        noteIndex=0;
    }

};

/*Removed startTimer from html*/
function startTimer() {
    points = [];
    counter =0;
    horSlider.value(0);
    vertSlider.value(5);
    drawGrid();
    timeStamp = frameCount;
    console.log('redraw grid');
}

function mousePressed(){
    if(mouseX <=15) {
        startTimer();
    }

}

function drawPoints(x, y){
    push();
    translate(-400,0);
    scale(2);
    //ellipse(200,200,10,10)
    //200,200 is the origin
    //400,0 is the upper right

    if(y>=0 && x<=400 && x>=0){
        //sliding everything over by 200 bc we are using the 1st quadrant
        tempX = round(x/div)*div;
        tempY = round(y/div)*div;
        stroke(0, 0, 255);
        fill(0, 0, 255);

        ellipse(tempX, tempY, 10,10);

        points.push(tempX);
        points.push(tempY);

        strokeWeight(2);
        if(points.length>3){
            line(points[points.length-4], points[points.length-3],points[points.length-2], points[points.length-1]);
        }

        strokeWeight(1);
        fill(0, 0, 0);
        textSize(10);

        noStroke();

        text(counter+1 + ',' + (5-vertSlider.value()),tempX-15,tempY-10);

        counter++;
    }

    pop();

}

