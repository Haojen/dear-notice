export default {
  install(Vue, config = {}) {
    let noticeId = 1, trigger;
    document.body.addEventListener('click', ev => {
      console.log(ev, 'evt on body')
      trigger = {
        x: ev.clientX,
        y: ev.clientY
      }
    })
    const NoticeConstructor = Vue.extend(require('./index.vue').default)

    Vue.prototype[config.prefix||'$notice'] = options => {
      const NoticeInstance = new NoticeConstructor({
        data: Object.assign({}, {
          show: true,
          title: '提示',
          cancel: '取消',
          confirm: '确认',

          trigger,
          backgroundEffectEl: config.backgroundEffectEl,
        }, options)
      })

      NoticeInstance.id = `notice-${noticeId}`
      NoticeInstance.vm = NoticeInstance.$mount()
      NoticeInstance.dom = NoticeInstance.vm.$el
      NoticeInstance.dom.style.zIndex = 1000 + noticeId
      document.body.appendChild(NoticeInstance.dom)
      return NoticeInstance
    }
  }
}