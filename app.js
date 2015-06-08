window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var sampleBis = document.querySelector('#sampleBis');
var initBt = document.querySelector('#init');
var timeIt = document.querySelector('#time');
var playBt = document.querySelector('#play');

var val1 = document.querySelector('#val1');
var val2 = document.querySelector('#val2');
var val3 = document.querySelector('#val3');
var val4 = document.querySelector('#val4');
var val5 = document.querySelector('#val5');
var val6 = document.querySelector('#val6');

var evt1 = document.querySelector('#evt1');
var evt2 = document.querySelector('#evt2');

var initTime;

var moyenne = function() {
    var somme = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        somme += arguments[i];
    }
    return somme / arguments.length;
};


playBt.onclick = function(evt){
    initTime = audioContext.currentTime;
    sampleBis.play();
};

timeIt.onclick = function(evt){
    var diff = audioContext.currentTime-initTime;
    val1.textContent = sampleBis.currentTime;
    val4.textContent = diff;
    var currentTimeDiff = sampleBis.currentTime-diff;
    val5.textContent = currentTimeDiff;
    var now = new Date();
    var ms = now.getMilliseconds();
    if(now.getMilliseconds() < 100){
        ms = '0'+ms;
    }
    var d = now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"."+ms;
    data[0].push(d);
    data[1].push(currentTimeDiff);
    getChart(data);
    var moy = moyenne.apply(null, data[1].slice(1));
    val6.textContent = moy;
};

var initFunction = function() {
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
};

initBt.onclick = initFunction;

initBt.addEventListener("touchstart", initFunction, false);


sampleBis.addEventListener("loadstart", function() {
    evt2.textContent = "loadstart";
}, true);

sampleBis.addEventListener("loadeddata", function() {
    evt2.textContent = "loadeddata";
}, true);




