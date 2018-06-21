import Vue from 'vue'
import App from './App'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  render: h => h(App)
})

let styleTagEl = document.getElementById('style-tag')
app.$on('msg', (text) => {
  styleTagEl.textContent += text
})
