import { PropType, ExtractPropTypes } from 'vue';

// ts 的类型都用大写开始
// js 的变量类型都使用 驼峰命名
export interface TreeNode {
  key: string;
  label: string;
  children: TreeNode[];
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeNode[]>,
    required: true,
  },
  keyField: {
    type: String as PropType<string>,
    default: 'key',
  },
  labelField: {
    type: String as PropType<string>,
    default: 'label',
  },
  childrenField: {
    type: String as PropType<string>,
    default: 'children',
  },
  defaultExpandKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
} as const;

export type TreeProps = ExtractPropTypes<typeof treeProps>;
