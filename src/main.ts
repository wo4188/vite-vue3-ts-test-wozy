import './styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

import { http, setupInterceptors } from './utils';
import directives from './directives';

const app = createApp(App);

setupInterceptors(http, router, pinia);

app.use(directives);
app.use(pinia);
app.use(router);
app.mount('#app');
