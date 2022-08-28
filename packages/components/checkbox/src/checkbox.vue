<template>
  <div :class="[bem.b()]" @click="handleClick">
    <div :class="[bem.e('wrapper')]">
      <div :class="[bem.e('box'), bem.is('checked', modelValue)]">
        <checked></checked>
      </div>
    </div>
    <div :class="[bem.e('label')]">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { createNamespace } from '../../../utils/create';
import Checked from './icon/checked';

const bem = createNamespace('checkbox');
defineOptions({
  name: 'z-checkbox',
});

const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  label: {
    type: String as PropType<string>,
    default: '',
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 半选
  indeterminate: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);
const handleClick = () => {
  emit('update:modelValue', !props.modelValue);
  emit('change', !props.modelValue);
};
</script>
