<template>
  <div :class="[bem.b()]" @click="handleClick">
    <div :class="[bem.e('wrapper')]">
      <div
        :class="[
          bem.e('box'),
          bem.is('checked', model),
          bem.is('indeterminate', indeterminate && !model),
        ]"
      >
        <indeterminate v-if="indeterminate && !model"></indeterminate>
        <checked v-if="model"></checked>
      </div>
    </div>
    <div :class="[bem.e('label')]">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref, watch } from 'vue';
import { createNamespace } from '../../../utils/create';
import Checked from './icon/checked';
import Indeterminate from './icon/indeterminate';

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

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit('update:modelValue', value);
  },
});

watch(
  () => props.indeterminate,
  (value) => {
    if (value) {
      emit('update:modelValue', false);
    }
  },
  {
    immediate: true,
  },
);

const emit = defineEmits(['update:modelValue', 'change']);
const handleClick = () => {
  emit('update:modelValue', !model.value);
  emit('change', !model.value);
};
</script>
