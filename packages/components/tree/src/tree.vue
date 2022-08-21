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
import { treeProps, TreeNode, TreeOption, Key } from './tree';
import { createNamespace } from '../../../utils/create';
import { ref, computed, watch } from 'vue';
import ZTreeNode from './tree-node.vue';
import nodeTest from 'node:test';
defineOptions({
  name: 'z-tree',
});
const bem = createNamespace('tree');
const props = defineProps(treeProps);

// 生成获取对应字段的方法

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string;
    },
    getLabel(node: TreeOption) {
      return node[label] as string;
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[];
    },
  };
}

const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField,
);

// 1. 对props 的数据进行格式化
/**
 *
 * @param data 用户传递的数据，一层数据
 * @param parent 这里要把 父节点传进去， 方便后序计算 level = parent.level += 1
 */
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  return data.map((node) => {
    const children = treeOptions.getChildren(node) || [];
    const treeNode: TreeNode = {
      rawNode: node,
      key: treeOptions.getKey(node),
      label: treeOptions.getLabel(node),
      children: [],
      level: parent ? parent.level + 1 : 0,
      isLeaf: node.isLeaf ?? children.length === 0,
    };
    if (children.length) {
      treeNode.children = createTree(children, treeNode);
    }
    return treeNode;
  });
}

const tree = ref<TreeNode[]>([]);
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data);
  },
  { immediate: true },
);

// 2. 根据要展开的 节点计算出扁平化的 list
const expandedKeysSet = ref(new Set(props.defaultExpandKeys));

// 采用深度优先遍历
const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value;
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
    if (expandedKeys.has(topNode.key)) {
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
  expandedKeysSet.value.add(node.key);
  // 展开的时候调用异步加载的逻辑
  triggerLoading(node);
}

// 折叠, 其实就是把当前点击的 节点 的 key 从展开节点的缓存中移除
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

//3. 用户点击展开按钮
function toggleExpand(node: TreeNode) {
  // 如果存在就从展开的节点里面删除，然后会从新计算 扁平的展开的数组
  if (expandedKeysSet.value.has(node.key)) {
    collapse(node);
  } else {
    expand(node);
  }
}

// 判断当前节点是否是展开的状态
function isExpanded(node: TreeNode) {
  return expandedKeysSet.value.has(node?.key);
}

// 4. 实现调用用户传递的异步加载函数
// 用来装正在加载节点的 key
const loadingKeysRef = ref(new Set<Key>());

function triggerLoading(node: TreeNode) {
  // 判断当前点击的 node 节点是否可以调用异步加载函数
  if (!node.children.length && !node.isLeaf) {
    const loadingKeys = loadingKeysRef.value;
    // 没有加载的时候，再调用加载函数
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          // 把用户传递进来的孩子保存在 原始数据的位置
          node.rawNode.children = children;
          // 重新构造树新的节点
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        });
      }
    }
  }
}
</script>
