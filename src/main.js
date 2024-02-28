import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .use(autoAnimatePlugin)
  .mount('#app')
