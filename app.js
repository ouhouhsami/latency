window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var sample = document.querySelector('#sample');
var sampleBis = document.querySelector('#sampleBis');
var timeIt = document.querySelector('#time');
var playBt = document.querySelector('#play');
var sampleMediaElementSource = audioContext.createMediaElementSource(sample);


var val1 = document.querySelector('#val1');
var val2 = document.querySelector('#val2');
var val3 = document.querySelector('#val3');
var val4 = document.querySelector('#val4');
var val5 = document.querySelector('#val5');

var initTime;

sampleMediaElementSource.connect(audioContext.destination);

playBt.onclick = function(evt){
    initTime = audioContext.currentTime;
    sample.play();
    sampleBis.play();
};

timeIt.onclick = function(evt){
    var diff = audioContext.currentTime-initTime;
    val1.textContent = sampleBis.currentTime;
    val2.textContent = sample.currentTime;
    val3.textContent = sampleBis.currentTime-sample.currentTime;
    val4.textContent = diff;
    val5.textContent = sampleBis.currentTime-diff;
};

window.addEventListener('touchstart', function() {

    // create empty buffer
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;

    // connect to output (your speakers)
    source.connect(audioContext.destination);

    // play the file
    source.noteOn(0);

}, false);


