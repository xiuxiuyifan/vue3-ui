import { defineComponent, inject, PropType } from 'vue';
import { TreeNode, treeInjectKey } from './tree';
export default defineComponent({
  name: 'z-tree-node-content',
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },
  setup(props) {
    const treeContext = inject(treeInjectKey);
    return () => {
      return treeContext?.slots.default
        ? treeContext.slots.default({ node: props.node })
        : props.node.label;
    };
  },
});
