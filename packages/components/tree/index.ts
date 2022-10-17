import _Tree from './src/tree.vue';
import { withInstall } from '@z-vue3-ui/utils/withInstall';

const Tree = withInstall(_Tree);

export default Tree;

// 支持vscode 插件提示 (volar插件)
declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree;
  }
}
