<template>
  <div :class="bem.b()" :style="{ paddingLeft: `${node.level * 16}px` }">
    <span
      :class="[
        bem.e('expand-icon'),
        { expanded: expanded },
        bem.is('leaf', node.isLeaf),
      ]"
      @click="handleExpand(node)"
    >
      <z-icon :size="14">
        <loading v-if="isLoading"></loading>
        <switcher v-else></switcher>
      </z-icon>
    </span>
    <span>{{ node.label }}</span>
  </div>
</template>
<script lang="ts" setup>
import { treeNodeProps, treeNodeEmits, TreeNode } from './tree';
import { createNamespace } from '../../../utils/create';
import Switcher from './icon/Switcher';
import Loading from './icon/Loading';
import { computed } from 'vue';

const props = defineProps(treeNodeProps);

const bem = createNamespace('tree-node');

const emit = defineEmits(treeNodeEmits);

const handleExpand = (node: TreeNode) => {
  emit('toggle', node);
};

const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key);
});
</script>
