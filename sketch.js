var song;
var filter;
var r1 = 150;
var r2 = 235 / 2;
var dv = 150;
var W = 1;
var intensity = 0;

function preload() {
  song = loadSound("./Assets/Nicholas Mackin_The Longest Year.mp3");
  back = loadImage("./Assets/back.png");
  woman = loadImage("./Assets/woman.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  angleMode(DEGREES);
  imageMode(CENTER);
  song.play();

  filter = new p5.LowPass();
  song.disconnect();
  song.connect(filter);
}

function draw() {

  var volumeUp = map(mouseY, 0, height, 0, 2.5);
  song.amp(volumeUp);

  var cutoffX = 10000;
  if (mouseX < width * 2 / 5) {
    cutoffX = map(mouseX, 0, width * 2 / 5, 10, 10000);
  } else if (mouseX > width * 2 / 5) {
    cutoffX = map(mouseX, width, width * 3 / 5, 10, 10000);
  } else {
    cutoffX = 10000;
  }
  filter.freq(cutoffX);

  image(back, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  stroke(150);
  fill(150);
  var myText = 'Volume up.  Ignore the world.';
  textFont('Montserrat');
  textAlign(CENTER);
  textSize(50);
  text(myText, width / 2, height / 10);

  noFill();
  intensity = map(intensity, 0, 150, 0, 100);
  var mouseIncr = map(mouseY, 0, height, 0, 100);
  var modColor = map(sqrt(mouseIncr * intensity), 0, 100, 0, 255);
  stroke(0 + modColor, 255 - modColor, 255);
  strokeWeight(1);

  push();
  translate(0, height / 1.7);
  var waveform = fft.waveform();
  beginShape();
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, windowWidth);
    var y = map(waveform[i], -1, 1, r2 - dv, r2 + dv);
    intensity = y;
    vertex(x, y);
  }
  endShape();
  pop();

  push();
  translate(width / 2, height / 2);
  image(woman, 0, 0 + windowHeight / 10, 1920, 1080);
  pop();
}
