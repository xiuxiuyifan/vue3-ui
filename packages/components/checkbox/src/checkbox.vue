<template>
  <div :class="[bem.b()]" @click="handleClick">
    <div :class="[bem.e('wrapper')]">
      <div :class="[bem.e('box'), bem.is('checked', checked)]">
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
  checked: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  label: {
    type: String as PropType<string>,
    default: '',
  },
});

const emit = defineEmits(['update:checked']);
const handleClick = () => {
  emit('update:checked', !props.checked);
};
</script>
