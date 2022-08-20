import { createApp } from 'vue';
import App from './App.vue';
import { createNamespace } from '@z-vue3-ui/utils/create';
import Icon from '@z-vue3-ui/components/icon';
import Tree from '@z-vue3-ui/components/tree';

import '@z-vue3-ui/theme-chalk/src/index.scss';

const app = createApp(App);
app.use(Icon);
app.use(Tree);
app.mount('#app');

const bem = createNamespace('icon');

console.log(bem.b());
console.log(bem.b('box'));
console.log(bem.e('element'));
console.log(bem.m('disabled'));
console.log(bem.is('checked'));
console.log(bem.bem('box', 'element', 'disabled'));
