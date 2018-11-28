import Vue from 'vue'
import Test from './test.vue'
// import TestCase from '../src/index.js'
import TestCase from '../dist/index'

Vue.use(TestCase, {
  backgroundEffectEl: '.test-page'
})

new Vue({
  el: '#app',
  components: {Test},
  template: '<Test/>',
  mounted() {
      // this.$notice({
      //   content: '声律启蒙是旧时学校启蒙读物之一，'
      // })
    setTimeout(() => {
      this.$notice({
        title: 'zen',
        cancel: '你好',
        content: 'haha',
      })
    }, 3000)
  }
})