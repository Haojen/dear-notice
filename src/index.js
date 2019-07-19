export default {
  install(Vue, config = {}) {
    let noticeId = 1;
    const NoticeConstructor = Vue.extend(require('./index.vue').default)

    Object.defineProperty(Vue.prototype, config.prefix|| '$notice', {
      value: options => {
        if (typeof options === 'string' || typeof options === 'number') {
          options = {
            content: options
          }
        }
        const NoticeInstance = new NoticeConstructor({
          data: Object.assign({}, {
            show: true,
            title: '提示',
            confirm: '确认',
            triggerEl: event,
            backgroundEffect: 'blur',
            backgroundEffectEl: config.backgroundEffectEl,
          }, options)
        })
        NoticeInstance.id = `dear-notice-${noticeId}`
        NoticeInstance.vm = NoticeInstance.$mount()
        NoticeInstance.dom = NoticeInstance.vm.$el
        NoticeInstance.dom.style.zIndex = 1000 + noticeId
        document.body.appendChild(NoticeInstance.dom)
        NoticeInstance.insertedDOM()
        noticeId++
        return NoticeInstance
      }
    })
  }
}