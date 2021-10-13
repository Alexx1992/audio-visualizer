/**
 * Created by Alex on 03.04.2016.
 */

var SongContext = function() {
  this.context = new AudioContext();
  this.buffer = null;
  this.source = null;
  this.destination = null;

  this.startOffset = 0;
  this.startTime = 0;

  this.analyser = this.context.createAnalyser();
  this.analyser.fftSize = 2048;
  this.bFrequencyData =  new Uint8Array(this.analyser.frequencyBinCount);

  this.progressInterval = null;
};

SongContext.prototype.loadSound = function(url) {
  var request = new XMLHttpRequest(),
      self = this;

  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  console.time('test');
  request.onload = function() {
    self.context.decodeAudioData(this.response, function(decodedArrayBuffer) {
      console.timeEnd('test');
      self.buffer = decodedArrayBuffer;
      document.getElementById('loader').style.display = 'none';
      document.getElementById('controller').style.display = 'flex';
    }, function(e) {
      console.log('Error: ' + e);
    })
  };

  request.send();
};

SongContext.prototype.play = function () {
  this.startTime = this.context.currentTime;

  this.source = this.context.createBufferSource();
  this.source.buffer = this.buffer;

  this.source.connect(this.analyser);
  this.source.connect(this.context.destination);

  this.source.start(0, this.startOffset % this.buffer.duration);

  this.progressInterval = setInterval(function() {
    animateCircle();
  }, 1000);
  animate.barsAnimation();
};

SongContext.prototype.stop = function() {
  this.source.stop();
  this.startOffset += this.context.currentTime - this.startTime;
  animate.stopBarsAnimation();
};


var songContext = new SongContext();