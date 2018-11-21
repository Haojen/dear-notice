import Vue from 'vue'
import Test from './test.vue'

import TestCase from '../src/index.js'

TestCase(Vue)

new Vue({
  el: '#app',
  components: {Test},
  template: '<Test/>'
})