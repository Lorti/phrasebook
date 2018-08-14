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
  if (!voice) {
    if (attempts < 10) {
      console.log('`ja-JP` voice not found, retry in 100 ms...');
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

function toggle(value) {
  status = value;
  console.debug(status);
}

function speak(text) {
  if (!status) {
    return;
  }
  if (!synth || synth.speaking) {
    console.debug(synth);
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.addEventListener('start', () => console.debug('SpeechSynthesisUtterance.start'));
  utterance.addEventListener('end', () => console.debug('SpeechSynthesisUtterance.end'));
  utterance.addEventListener('error', error => console.error(error));
  utterance.voice = voice;
  synth.speak(utterance);
}

export default {
  toggle,
  speak,
};
