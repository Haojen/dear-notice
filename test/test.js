import Vue from 'vue'
import Test from './test.vue'
import TestCase from '../src/index.js'
// import TestCase from '../dist/index'

Vue.use(TestCase, {
  backgroundEffectEl: '.test-page'
})

new Vue({
  el: '#app',
  components: {Test},
  template: '<Test/>',
  mounted() {
      this.$notice({
        content: '声律启蒙是旧时学校启蒙读物之一，为康熙年间进士车万育所著。按韵分编，包罗天文、地理、花木、鸟兽、人物、器物等的虚实应对。含单字对、双字对、三字对、五字对、七字对、十一字对等。'
      })
  }
})