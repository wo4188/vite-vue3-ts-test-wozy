import { App } from 'vue';
import sizeOb from './v-size-ob';

const directives = {
  sizeOb,
};

export default {
  install(app: App) {
    Object.entries(directives).forEach(([name, directive]) => {
      app.directive(name, directive);
    });
  },
};
