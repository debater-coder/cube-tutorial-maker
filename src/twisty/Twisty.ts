import { TwistyPlayer } from "cubing/twisty";

export default class {
  player = new TwistyPlayer({
    alg: "([R, U])6",
  });
  videoStream!: MediaStream;
  mediaRecorder!: MediaRecorder;
  chunks: Blob[] = [];
  recordingUrl: string | null = null;
  constructor() {
    this.player.experimentalCurrentThreeJSPuzzleObject(() => {
      if (!this.videoStream) {
        this.player.experimentalCurrentCanvases().then((canvases) => {
          this.videoStream = canvases[0].captureStream(30);
          this.mediaRecorder = new MediaRecorder(this.videoStream);
          this.mediaRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
          };
          this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: "video/mp4" });
            this.chunks = [];
            const videoURL = URL.createObjectURL(blob);
            this.recordingUrl = videoURL;
          };
        });
      }
    });
  }
}
