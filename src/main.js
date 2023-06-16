import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'

// 引用
import { createPinia } from 'pinia'
// 创建Pinia实例
const Pinia = createPinia()

// 全局css
import './assets/css/common.css';
import Vant from "vant";
import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)
app.use(Vant)
app.use(Pinia)
app.mount('#app')
