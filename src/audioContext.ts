class AudioCtx {
  readonly context = new AudioContext();
  readonly analyser = this.context.createAnalyser();
  readonly source = this.context.createBufferSource();
  audioData = new Uint8Array();

  constructor() {
    this.analyser.fftSize = 2048;
    this.audioData = new Uint8Array(this.analyser.frequencyBinCount);
  }
  
  async init(buffer) {
    const decodeAudio = await this.context.decodeAudioData(buffer);
    this.source.buffer = decodeAudio;

    this.initAnalyser();
  }

  initAnalyser() {
    this.source.connect(this.analyser);
  }

  play () {
    this.source.connect(this.context.destination);
    this.source.start();
  }
}

export default AudioCtx;