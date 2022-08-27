import _Checkbox from './src/checkbox.vue';
import { withInstall } from '@z-vue3-ui/utils/withInstall';

const Checkbox = withInstall(_Checkbox);

export default Checkbox;

declare module 'vue' {
  export interface GlobalComponents {
    ZCheckbox: typeof Checkbox;
  }
}
