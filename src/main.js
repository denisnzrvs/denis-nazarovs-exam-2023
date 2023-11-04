import './assets/main.scss'
import HeaderComponent from './components/HeaderComponent.vue'
import AudioPlayerComponent from './components/AudioPlayerComponent.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component("Header", HeaderComponent);
app.component("AudioPlayer", AudioPlayerComponent);

app.mount('#app')


