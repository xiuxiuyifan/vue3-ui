<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5';
import { ref } from 'vue';
import { TreeOption } from '../../packages/components/tree/src/tree';

// 先生成数据
function createData(level = 1, parentLabel = ''): any {
  if (level > 4) return [];
  const arr = Array<number>(10).fill(0);
  return arr.map((item, index) => {
    // 当前的label 等于 父级的 label + index
    const label = parentLabel
      ? `${parentLabel}-${index + 1}`
      : String(index + 1);
    return {
      keyName: label,
      labelName: label,
      childrenName: createData(level + 1, label),
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

function createData1(): TreeOption[] {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false,
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false,
    },
  ];
}
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born';
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two';
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three';
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe';
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born';
  }
  return '';
}
const data1 = ref(createData1());

// const checkedKeysRef = ref([]);

function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: `${node.key} + ${node.label}` || '',
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
}
</script>

<template>
  <z-icon color="red" size="30">
    <CashOutline />
  </z-icon>
  <z-icon color="blue" size="30">
    <CashOutline />
  </z-icon>
  <hr />
  <div>
    <z-tree
      :data="data"
      key-field="keyName"
      label-field="labelName"
      children-field="childrenName"
    />
  </div>
  <hr />
  <div>
    <z-tree :data="data1" :on-load="handleLoad"></z-tree>
  </div>
</template>

<style scoped></style>
