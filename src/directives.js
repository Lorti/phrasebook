function install(Vue) {
  function setTitle(title) {
    if (title) {
      document.title = `${title} | Japanese Phrasebook`;
    } else {
      document.title = 'Japanese Phrasebook';
    }
  }

  function setDescription(text) {
    const element = document.querySelector('meta[name="description"]');
    const description = '⛩ 100% free Japanese Phrasebook app, built for travel and offline usage. Add it to your Home screen and access 670+ essential phrases in 19 topics. Requires no Internet connection and offers speech synthesis, so you know how to pronounce Japanese phrases correctly.';
    element.content = text || description;
  }

  Vue.directive('document-title', {
    inserted(el, binding) { setTitle(binding.value); },
    update(el, binding) { setTitle(binding.value); },
  });

  Vue.directive('meta-description', {
    inserted(el, binding) { setDescription(binding.value); },
    update(el, binding) { setDescription(binding.value); },
  });
}

export default {
  install,
};
