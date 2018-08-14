/* eslint-disable no-console,no-plusplus */
let synth;
let voice;

let status = false;

// https://stackoverflow.com/q/21513706
let attempts = 0;
function loadVoices() {
  attempts++;
  const voices = synth.getVoices();
  if (voices.length) {
    voice = voices.find(_voice => /ja[-_]JP/.test(_voice.lang));
  }
  if (!voice && attempts < 10) {
    setTimeout(() => {
      loadVoices();
    }, 100);
  }
}

if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;
  loadVoices();
}

function toggle(value) {
  status = value;
}

function speak(text) {
  if (!status || !synth || synth.speaking) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.addEventListener('error', error => console.error(error));
  utterance.voice = voice;
  synth.speak(utterance);
}

export default {
  toggle,
  speak,
};
