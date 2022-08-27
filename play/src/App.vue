<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5';
import { ref } from 'vue';
import { TreeOption, Key } from '../../packages/components/tree/src/tree';

// 先生成数据
function createData(level = 1, parentLabel = ''): TreeOption[] {
  if (level > 2) return [];
  const arr = Array<number>(40).fill(0);
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

// function createData1(): TreeOption[] {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false,
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false,
//     },
//   ];
// }
// function nextLabel(currentLabel?: string | number): string {
//   if (!currentLabel) return 'Out of Tao, One is born';
//   if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two';
//   if (currentLabel === 'Out of One, Two') return 'Out of Two, Three';
//   if (currentLabel === 'Out of Two, Three') {
//     return 'Out of Three, the created universe';
//   }
//   if (currentLabel === 'Out of Three, the created universe') {
//     return 'Out of Tao, One is born';
//   }
//   return '';
// }
// const data1 = ref(createData1());

// // const checkedKeysRef = ref([]);

// function handleLoad(node: TreeOption) {
//   return new Promise<TreeOption[]>((resolve, reject) => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: nextLabel(node.label),
//           key: `${node.key} + ${node.label}` || '',
//           isLeaf: false,
//         },
//       ]);
//     }, 1000);
//   });
// }

// const value = ref<Key[]>([]);
// const value1 = ref<Key[]>([]);

// // 节点禁用

// const data2 = [
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0',
//       },
//       {
//         disabled: true,
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0',
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: '1',
//     label: '1',
//     children: [
//       {
//         key: '1-0',
//         label: '1-0',
//       },
//       {
//         checkboxDisabled: true,
//         key: '1-1',
//         label: '1-1',
//         children: [
//           {
//             label: '1-1-0',
//             key: '1-1-0',
//           },
//           {
//             label: '1-1-1',
//             key: '1-1-1',
//           },
//         ],
//       },
//     ],
//   },
// ];

// 节点选中
</script>

<template>
  <h3>icon组件</h3>
  <hr />
  <z-icon color="red" size="30">
    <CashOutline />
  </z-icon>
  <z-icon color="blue" size="30">
    <CashOutline />
  </z-icon>
  <!-- <h3>tree组件</h3>
  <hr />
  <div>{{ value }}</div>
  <div>
    <z-tree
      :data="data"
      key-field="keyName"
      label-field="labelName"
      children-field="childrenName"
      selectable
      v-model:selected-keys="value"
    />
  </div>
  <h3>tree 异步加载</h3>
  <hr />
  <div>
    <z-tree :data="data1" :on-load="handleLoad"></z-tree>
  </div>
  <h3>tree 节点选择</h3>
  <div>{{ value1 }}</div>
  <div>
    <z-tree
      :data="data"
      key-field="keyName"
      label-field="labelName"
      children-field="childrenName"
      selectable
      multiple
      v-model:selected-keys="value1"
    ></z-tree>
  </div> -->
  <h3>tree 节点禁用</h3>
  <hr />
  <div>
    <z-tree
      :data="data"
      key-field="keyName"
      label-field="labelName"
      children-field="childrenName"
    ></z-tree>
    <div>hihihi</div>
  </div>
</template>

<style scoped></style>
