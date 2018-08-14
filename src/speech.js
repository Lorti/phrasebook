let synth;
let voice;

if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;

  synth.addEventListener('voiceschanged', () => {
    const voices = synth.getVoices();
    voice = voices.find(_voice => /ja[-_]JP/.test(_voice.lang));
    if (!voice) {
      // eslint-disable-next-line no-console
      console.error(voices);
    }
  });
}

let status = false;
function toggle(value) {
  status = value;
}

function speak(text) {
  if (!status || !synth || synth.speaking) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  // eslint-disable-next-line no-console
  utterance.addEventListener('error', error => console.error(error));
  utterance.voice = voice;
  synth.speak(utterance);
}

export default {
  toggle,
  speak,
};
