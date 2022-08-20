<template>
  <div :class="bem.b()"></div>
</template>

<script lang="ts" setup>
import { treeProps, TreeNode } from './tree';
import { createNamespace } from '../../../utils/create';
import { ref, PropType } from 'vue';
defineOptions({
  name: 'z-tree',
});
const bem = createNamespace('tree');
const props = defineProps(treeProps);

// 生成获取对应字段的方法

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeNode) {
      return node[key] as string;
    },
    getLabel(node: TreeNode) {
      return node[label] as string;
    },
    getChildren(node: TreeNode) {
      return node[children] as TreeNode[];
    },
  };
}

const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField,
);

// 对props 的数据进行格式化
function createTree(data: TreeNode[]) {
  return data.map((node) => {
    const children = treeOptions.getChildren(node) || [];
    const treeNode: TreeNode = {
      key: treeOptions.getKey(node),
      label: treeOptions.getLabel(node),
      children: [],
    };
    if (children.length) {
      treeNode.children = createTree(children);
    }
    return treeNode;
  });
}

const tree = ref<TreeNode[]>([]);
tree.value = createTree(props.data);
console.log(tree);
</script>
