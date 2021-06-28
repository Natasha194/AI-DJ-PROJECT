var capture;


scoreLeftWrist = 0;
var scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

var songs = document.getElementById("audio").src;
song = document.getElementById("audio");

numberLeftWristY = 0;

function setup() {
  canvas =  createCanvas(450, 390);
  canvas.center();
    capture = createCapture(VIDEO);
    capture.hide();
    poseNet = ml5.poseNet(capture, modelLoaded);
    poseNet.on('pose', gotPoses);
  }

function modelLoaded() {
  console.log('poseNet is initalized');
}

function draw() {  
  push();
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, 450, 390);
  pop();



  if (scoreRightWrist > 0.2) {

  fill("#FFFFFF");
  stroke("#FFFFFF");
  circle(10, 10, 20);

  song.stop();

  if(songs == "music.mp3") {
    songs = "Agatha All Along.mp3";
  }
  else if(songs == "Agatha All Along.mp3") {
    songs = "music.mp3";
  }

}

function preload() {
  loadSong(songs);
}

  


if(scoreLeftWrist > 0.2) {
   fill("#000000");
  stroke("#000000");

  circle(10, 10, 20);

  song.play();
}

  
}


function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    leftWristX = results[0].pose.rightWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log('Right Wrist X: ' + rightWristX + 'Right Wrist Y: ' + rightWristY + 'Left Wrist X: ' + leftWristX + 'Left Wrist Y: ' + leftWristY);
  }
}



function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}