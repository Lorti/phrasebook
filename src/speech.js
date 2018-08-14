let synth;

function toggle(value) {
  if (value && 'speechSynthesis' in window) {
    synth = window.speechSynthesis;
  } else {
    synth = null;
  }
}

function speak(text) {
  if (!synth || synth.speaking) {
    return;
  }
  const voices = synth.getVoices();
  const voice = voices.find(_voice => /ja[-_]JP/.test(_voice.lang));
  if (!voice) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  synth.speak(utterance);
}

export default {
  toggle,
  speak,
};
