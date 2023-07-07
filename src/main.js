// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import vuetify from '@/plugins/vuetify' // path to vuetify export

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false


/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Comprobar si la ruta requiere autenticación
  if (requiresAuth) {
    const authenticated = document.cookie.includes('authenticated=true');
    
    if (authenticated) {
      // El usuario está autenticado, permitir el acceso a la ruta
      next();
    } else {
      // El usuario no está autenticado, redirigir al login
      next('/login');
    }
  } else {
    // La ruta no requiere autenticación, permitir el acceso
    next();
  }
})


new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
