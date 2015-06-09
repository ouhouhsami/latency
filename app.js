window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var sampleBis = document.querySelector('#sampleBis');
var initBt = document.querySelector('#init');
var timeIt = document.querySelector('#time');
var playBt = document.querySelector('#play');
var stopBt = document.querySelector('#stop');
var collectBt = document.querySelector('#collect');

var val1 = document.querySelector('#val1');
var val2 = document.querySelector('#val2');
var val4 = document.querySelector('#val4');
var val5 = document.querySelector('#val5');
var val6 = document.querySelector('#val6');
var val7 = document.querySelector('#val7');

var evt1 = document.querySelector('#evt1');
var evt2 = document.querySelector('#evt2');

var initTime;

var data = [['x'], ['Diff CurrentTime HTML5 Web vs. Audio API']];

function getChart(data){
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            x: 'x',
            xFormat: '%Y-%m-%d %H:%M:%S.%L',
            columns: data
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d %H:%M:%S.%L'
                }
            }
        }
    });
    return;
}
getChart(data);


val2.textContent = audioContext.currentTime;


playBt.onclick = function(evt){
    data = [
            ['x'],
            ['diff']
            ];
    initTime = audioContext.currentTime;
    sampleBis.currentTime = 0;
    sampleBis.play();
};

stopBt.onclick = function(evt){
    sampleBis.pause();
};

timeIt.onclick = function(evt){
    var diff = audioContext.currentTime-initTime;
    val1.textContent = sampleBis.currentTime;
    val2.textContent = audioContext.currentTime;
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
    val6.textContent = average(data[1].slice(1));
    val7.textContent = standardDeviation(data[1].slice(1));
};


var collId;

collectBt.onchange = function(evt){
    console.log(evt.target.checked);
    if(evt.target.checked){
        collId = setInterval(timeIt.onclick, 500);
    }else{
        clearInterval(collId);
    }
};

var initFunction = function() {
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    val2.textContent = audioContext.currentTime;
};

initBt.onclick = initFunction;

initBt.addEventListener("touchstart", initFunction, false);


sampleBis.addEventListener("loadstart", function() {
    evt2.textContent = "loadstart";
}, true);

sampleBis.addEventListener("loadeddata", function() {
    evt2.textContent = "loadeddata";
}, true);




