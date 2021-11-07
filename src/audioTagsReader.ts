import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js';

function audioTagsReader(buffer: ArrayBuffer) {
  const blob = new Blob([buffer]);
  return new Promise((resolve, reject) => {
    jsmediatags.read(blob, {
      onSuccess: (tag) => resolve(tag),
      onError: (err) => reject(err)
    });
  });
}

function addCover(tags) {
  const coverEl = document.getElementById('cover')!;
  const { data, format } = tags.tags.picture;
  let base64String = "";

  for (let i = 0; i < data.length; i++) {
    base64String += String.fromCharCode(data[i]);
  }
  (coverEl as HTMLImageElement).src = `data:${format};base64,${window.btoa(base64String)}`;
}

export {
  audioTagsReader, 
  addCover
};