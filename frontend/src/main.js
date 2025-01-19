import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createMetaManager } from 'vue-meta';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/global.css';
import './assets/css/admin.css';
import 'vue-toastification/dist/index.css';
import Toast, { useToast } from 'vue-toastification';
import store from './store';  // Import the Vuex store

const app = createApp(App);
app.use(store);  // Tell Vue to use the Vuex store
app.use(Toast); // Enable Toastification
app.use(useToast);
app.use(router);
app.use(createMetaManager());
app.mount('#app');
