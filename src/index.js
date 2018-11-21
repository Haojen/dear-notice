
let noticeId = 1, noticeNum = 1

export default function (Vue, pramas) {
  const NoticeConstructor = Vue.extend(require('./index.vue').default)
  const defaultConfig = {
    show: true,
    title: '提示',
    content: '',
    cancel: '取消',
    confirm: '确认',
    onCancel() {},
    onConfirm() {},
    showCancel: false,
    _NOTICE_NUM: noticeNum++
  }

  pramas = Object.assign({}, defaultConfig, pramas)
  const NoticeInstance = new NoticeConstructor({
    data: pramas
  })

  NoticeInstance.id = `notice-${noticeId++}`
  NoticeInstance.vm = NoticeInstance.$mount()
  NoticeInstance.dom = NoticeInstance.vm.$el
  NoticeInstance.dom.style.zIndex = 1000 + noticeId
  document.body.appendChild(NoticeInstance.dom)
  return NoticeInstance
}