<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', isDisabled),
    ]"
    :style="{ paddingLeft: `${node.level * 16}px` }"
    @click="handleSelected"
  >
    <span
      :class="[
        bem.e('expand-icon'),
        { expanded: expanded },
        bem.is('leaf', node.isLeaf),
      ]"
      @click.stop="handleExpand"
    >
      <z-icon :size="14">
        <loading v-if="isLoading"></loading>
        <switcher v-else></switcher>
      </z-icon>
    </span>
    <span :class="[bem.e('content'), bem.is('disabled', isDisabled)]">
      {{ node.label }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { treeNodeProps, treeNodeEmits } from './tree';
import { createNamespace } from '../../../utils/create';
import Switcher from './icon/Switcher';
import Loading from './icon/Loading';
import { computed } from 'vue';

const props = defineProps(treeNodeProps);

const bem = createNamespace('tree-node');

const emit = defineEmits(treeNodeEmits);

const handleExpand = () => {
  emit('toggle', props.node);
};

const handleSelected = () => {
  emit('select', props.node);
};

const isLoading = computed(() => {
  // 如果是禁用的则不能选中
  if (props.node.disabled) return;
  return props.loadingKeys.has(props.node.key);
});

const isSelected = computed(() => {
  return props.selectedKeys?.includes(props.node.key);
});

const isDisabled = computed(() => {
  return props.node.disabled;
});
</script>
