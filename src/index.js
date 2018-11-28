export default {
  install(Vue, config = {}) {
    let noticeId = 1;
    const NoticeConstructor = Vue.extend(require('./index.vue').default)
    Vue.prototype[config.prefix||'$notice'] = options => {
      const NoticeInstance = new NoticeConstructor({
        data: Object.assign({}, {
          show: true,
          title: '提示',
          cancel: '取消',
          confirm: '确认',
          triggerEl: event,
          backgroundEffectEl: config.backgroundEffectEl,
        }, options)
      })

      NoticeInstance.id = `notice-${noticeId}`
      NoticeInstance.vm = NoticeInstance.$mount()
      NoticeInstance.dom = NoticeInstance.vm.$el
      NoticeInstance.dom.style.zIndex = 1000 + noticeId
      document.body.appendChild(NoticeInstance.dom)
      NoticeInstance.insertedDOM()
      return NoticeInstance
    }
  }
}