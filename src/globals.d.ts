export {};

declare global {
  interface Window {
    showOpenFilePicker: (opt) => Promise<FileSystemFileHandle>;
  }
}