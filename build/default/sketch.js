//var mybtn = new Clipboard('.btn');

var div = 20;
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
var synth;

var noDups = function(){
    for (var k = 0;k<points.length-2;k+=2){
        if(points[k] === tempX && points[k+1] === tempY){
            duplicates = true;
        }
    }
};

function redraw(){
    //points = [];
    //timeStamp = frameCount;
    console.log('redraw');
}

function loadSynth(synth_input){
    synth = synth_input;
}

function playNotes(){
    if(frameCount - timeStamp < 1200 && timeStamp !=0) {
        if (frameCount % 40 === 0) {
            horSlider.value(horValue += 0.1);
            drawPoints(horSlider.value() * 120, 400 - vertSlider.value() * 120);
            //create a synth and connect it to the master output (your speakers)
            //var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
            synth.triggerAttackRelease('C4', '8n');
        }
    }
    else{
        horSlider.value(0);
    }
}

function drawGrid(){
    background(255);
    textSize(20);
    stroke(0,0,0);

    for (let i=0;i<400;i++){
        line(i*div,j,i*div,j+400);
    }
    i=0;
    for (let j=0;j<400;j++){
        line(i,j*div,i+400,j*div);
    }

    stroke(255, 0, 0);
    strokeWeight(2);
    line(0,200,400,200);
    line(200,0,200,400);
    strokeWeight(1);

    stroke(0, 0, 0);
    textSize(20);
    fill(0, 0, 0);
    text("+X",366,191);
    text("-X",5,191);
    text("+Y",207,20);
    text("-Y",207,394);
}

function setup() {
    strokeWeight(1);
    stroke(0, 0, 0);
    var cnv = createCanvas(405, 405);
    cnv.style('display', 'block');
    cnv.position(450,0);

    drawGrid();

    noStroke();
    textSize(17);
    fill(255, 0, 0);
    textSize(20);
    stroke(0,0,0);
    strokeWeight(1);
    fill(0, 0, 0);

    vertSlider = createSlider(0, 3, 0,0.1);
    vertSlider.id('vertSlider');
    vertSlider.position(350, 0);
    vertSlider.style('height', '400px');
    vertSlider.style('-webkit-appearance', 'slider-vertical');

    horSlider = createSlider(0, 3, 0,0.1);
    horSlider.id('horSlider');
    horSlider.position(430, 400);
    horSlider.style('width', '420px');
};


function draw() {
    horValue = horSlider.value();
    playNotes();
};


function mouseClicked() {
    if(mouseY<450) {
        drawPoints(mouseX, mouseY);
    }
};

function drawPoints(x, y){
    if(y>0 && x<400 && x>0){
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
        textSize(15);
        text(round((mouseX-200)/div) + "," + -round((mouseY-200)/div), tempX-5, tempY-5);
        noStroke();
        if(counter===0){
            text("coordinates",10,10);
        }
        noDups();
        if (duplicates === false){
            text("("+round((mouseX-200)/div) + "," + -round((mouseY-200)/div) +")", 10, 230+counter*15);

            if(counter === 0){
                coord_text = "createStationBlock" + "([["+round((mouseX-200)/40) + "," + -round((mouseY-200)/40) +"]";
                //document.getElementById("foo").value = coord_text;
            }
            else{
                coord_text = coord_text + "," + "["+round((mouseX-200)/40) + "," + -round((mouseY-200)/40) +"]";
                //document.getElementById("foo").value = coord_text;
            }
        }
        else{
            coord_text = coord_text +"])";
            //document.getElementById("foo").value = coord_text;

        }
        duplicates = false;
        counter++;
    }
}


