import Vue from 'vue'
import App from './App.vue'

import Router from 'vue-router'

import startPage from './components/StartPage.vue'  
import searchPage from './components/SearchPage.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: startPage },
  { path: '/search', component: searchPage },
]

const router = new Router({
  routes
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
