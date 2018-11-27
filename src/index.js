// Support iOS8 WeakSet
// import 'core-js/fn/weak-set'

export default {
  install(Vue, config = {}) {
    // const wk = new WeakSet([[1,2],[3,4]])


    // console.log(wk, 'xxxxxxxx')
    let noticeId = 1;

    const NoticeConstructor = Vue.extend(require('./index.vue').default)

    Vue.prototype[config.prefix||'$notice'] = options => {
      const NoticeInstance = new NoticeConstructor({
        data: Object.assign({}, {
          show: true,
          title: '提示',
          cancel: '取消',
          confirm: '确认',

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