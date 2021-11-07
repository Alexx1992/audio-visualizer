import AudioCtx from './audioContext';
import { audioTagsReader, addCover } from './audioTagsReader'
import updateRenderer from './renderer';

const folderIcon = document.getElementById('folder-icon')!;
const arrowIcon = document.getElementById('arrow-icon')!;
const linkField = document.getElementById('link-field')!;

window.addEventListener('load', () => {
  const audioCtx = new AudioCtx();

  folderIcon.addEventListener('click', async () => {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'Audio',
        accept: {
          'audio/*': ['.acc', '.mpeg', '.ogg', '.opus', '.webm']
        }
      }]
    });
    const file: File = await fileHandle.getFile();
    await startAudio(file);
  });

  arrowIcon.addEventListener('click', async () => {
    const url = (linkField as HTMLInputElement).value;
    const isUrl = /http(s|):/g.test(url);

    if (isUrl) {
      const res = await fetch(url);
      await startAudio(res);
    }
  });

  async function startAudio(data: File | Response) {
    const buffer = await data.arrayBuffer();

    try {
      const tags = await audioTagsReader(buffer);
      addCover(tags);
    } finally {
      await audioCtx.init(buffer);
      audioCtx.play();
      anim();
    }
  }

  function anim() {
    requestAnimationFrame(anim);

    audioCtx.analyser.getByteFrequencyData(audioCtx.audioData);
    updateRenderer(audioCtx.audioData);
  }
});