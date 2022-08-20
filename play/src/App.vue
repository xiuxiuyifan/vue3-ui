<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5';
import { ref } from 'vue';
import { TreeNode } from '../../packages/components/tree/src/tree';

// 先生成数据
function createData(level = 1): any {
  if (level > 4) return [];
  const arr = Array<number>(10).fill(0);
  return arr.map((item, index) => {
    return {
      keyName: `${level}-${index}`,
      labelName: genLabel(level),
      childrenName: createData(level + 1),
    };
  });
}
function genLabel(level: number) {
  if (level === 1) return '第一层';
  if (level === 2) return '第二层';
  if (level === 3) return '第三层';
  if (level === 4) return '第四层';
  return '';
}
const data = ref(createData());
console.log(data);
</script>

<template>
  <z-icon color="red" size="80">
    <CashOutline />
  </z-icon>
  <z-icon color="blue" size="50">
    <CashOutline />
  </z-icon>

  <div>
    <z-tree
      :data="data"
      key-field="keyName"
      label-field="labelName"
      children-field="childrenName"
    />
  </div>
</template>

<style scoped></style>
