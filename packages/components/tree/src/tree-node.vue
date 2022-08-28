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
    <z-checkbox
      v-if="showCheckbox"
      :disabled="disabled"
      :model-value="checked"
      @change="handleCheckChange"
    ></z-checkbox>
    <span :class="[bem.e('content'), bem.is('disabled', isDisabled)]">
      <tree-node-content :node="node"></tree-node-content>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { treeNodeProps, treeNodeEmits } from './tree';
import { createNamespace } from '../../../utils/create';
import Switcher from './icon/Switcher';
import Loading from './icon/Loading';
import treeNodeContent from './tree-node-content';
import ZCheckbox from '@z-vue3-ui/components/checkbox';

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

const handleCheckChange = (checked: boolean) => {
  emit('check', props.node, checked);
};
</script>
