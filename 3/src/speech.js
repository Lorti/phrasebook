/* eslint-disable no-console,no-plusplus */
let synth;
let voice;

// https://stackoverflow.com/q/21513706
let attempts = 0;
function loadVoices() {
  attempts++;
  const voices = synth.getVoices();
  if (voices.length) {
    voice = voices.find(_voice => /ja[-_]JP/.test(_voice.lang));
  }
  if (!voice) {
    if (attempts < 10) {
      setTimeout(() => {
        loadVoices();
      }, 250);
    } else {
      console.error('`ja-JP` voice not found.');
    }
  }
}

if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;
  loadVoices();
}

function speak(text) {
  if (!synth || synth.speaking) {
    return;
  }
  // …, /, ..., ___
  const output = text.replace(/([…/]|[._]{2,})/g, '');
  const utterance = new SpeechSynthesisUtterance(output);
  utterance.addEventListener('error', error => console.error(error));
  utterance.lang = 'ja-JP';
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.voice = voice;
  utterance.volume = 1;
  synth.speak(utterance);
}

export default {
  speak,
};
