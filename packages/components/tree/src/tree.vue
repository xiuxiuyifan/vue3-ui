<template>
  <div :class="bem.b()">
    <template v-for="node in flattenTree" :key="node.key">
      <z-tree-node
        :node="node"
        :expanded="isExpanded(node)"
        @toggle="toggleExpand"
      ></z-tree-node>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { treeProps, TreeNode } from './tree';
import { createNamespace } from '../../../utils/create';
import { ref, computed } from 'vue';
import ZTreeNode from './tree-node.vue';
import Tree from '../index';
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
function createTree(data: TreeNode[], level = 0) {
  return data.map((node) => {
    const children = treeOptions.getChildren(node) || [];
    const treeNode: TreeNode = {
      key: treeOptions.getKey(node),
      label: treeOptions.getLabel(node),
      children: [],
      level,
      isLeaf: node.isLeaf ?? children.length === 0,
    };
    if (children.length) {
      treeNode.children = createTree(children, level + 1);
    }
    return treeNode;
  });
}

const tree = ref<TreeNode[]>([]);
tree.value = createTree(props.data);

// 根据要展开的 节点计算出扁平化的 list

const expandKeys = ref(new Set(props.defaultExpandKeys));

// 采用深度优先遍历
const flattenTree = computed(() => {
  const result: TreeNode[] = [];
  const stack: TreeNode[] = [];
  for (let i = tree.value.length - 1; i >= 0; i--) {
    stack.push(tree.value[i]);
  }
  while (stack.length) {
    const topNode: TreeNode | undefined = stack.pop();
    if (!topNode) continue;
    result.push(topNode);
    // 判断当前的 key在不在 选中的里面
    if (expandKeys.value.has(topNode.key)) {
      // 如果在里面就把儿子也加入到 栈 里面
      for (let i = topNode.children.length - 1; i >= 0; i--) {
        stack.push(topNode.children[i]);
      }
    }
  }
  return result;
});

// 切换展开和收起状态

function expand(node: TreeNode) {
  expandKeys.value.add(node.key);
}

// 折叠, 其实就是把当前点击的 节点 的 key 从展开节点的缓存中移除
function collapse(node: TreeNode) {
  expandKeys.value.delete(node.key);
}

//用户点击展开按钮
function toggleExpand(node: TreeNode) {
  // 如果存在就从展开的节点里面删除，然后会从新计算 扁平的展开的数组
  if (expandKeys.value.has(node.key)) {
    collapse(node);
  } else {
    expand(node);
  }
}

// 判断当前节点是否是展开的状态
function isExpanded(node: TreeNode) {
  return expandKeys.value.has(node.key);
}
</script>
