import Vue from 'vue'
import Test from './test.vue'
// import TestCase from '../src/index.js'
import TestCase from '../dist/dearnotice'

Vue.use(TestCase, {
  backgroundEffectEl: '.test-page'
})

new Vue({
  el: '#app',
  components: {Test},
  template: '<Test/>',
  mounted() {
      this.$notice({
        content: '声律启蒙是旧时学校启蒙读物之一，为康熙年间进士车万育所著。按韵分编，包罗天文、地理、花木、鸟兽、人物、器物等的虚实应对。含单字对、双字对、三字对、五字对、七字对、十一字对等。从单字到多字的层层组对，读起来如唱歌般朗朗上口，较之其它全用三言、四言句式的《三字经》、《千字文》更见韵味，在启蒙读物中独具一格，经久不衰,声律启蒙是旧时学校启蒙读物之一，为康熙年间进士车万育所著。按韵分编，包罗天文、地理、花木、鸟兽、人物、器物等的虚实应对。含单字对、双字对、三字对、五字对、七字对、十一字对等。从单字到多字的层层组对，读起来如唱歌般朗朗上口，较之其它全用三言、四言句式的《三字经》、《千字文》更见韵味，在启蒙读物中独具一格，经久不衰'
      })
  }
})