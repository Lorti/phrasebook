function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
  return null;
}

const titleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = `🇯🇵 Phrasebook | ${title}`;
    } else {
      document.title = '🇯🇵 Phrasebook';
    }
  },
};

export default titleMixin;
