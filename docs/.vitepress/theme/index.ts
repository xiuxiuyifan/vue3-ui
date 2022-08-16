import DefaultTheme from 'vitepress/theme';
import '@z-vue3-ui/theme-chalk/src/index.scss';
import ZIcon from '@z-vue3-ui/components/icon';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon); // 注册组件
  },
};
