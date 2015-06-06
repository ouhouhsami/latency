var audioContext = new window.AudioContext() || new window.webkitAudioContext();
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

var initTime = audioContext.currentTime;

sampleMediaElementSource.connect(audioContext.destination);

playBt.onclick = function(evt){
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
}


