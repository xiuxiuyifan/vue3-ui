# Icon 图标

z-ui 推荐使用 xicons 作为图标库。

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

- 如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里使用。

<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
const handleClick = () =>{ alert(1)}
</script>

<ZIcon color="red" size="40" @click="handleClick">
<CashOutline/>
</ZIcon>

<ZIcon color="green" size="40">
  <CashOutline/>
</ZIcon>
<ZIcon color="blue" size="40">
  <CashOutline/>
</ZIcon>
<div>

<ZIcon color="red" size="60">
  <CashOutline/>
</ZIcon>

<ZIcon color="green" size="60">
  <CashOutline/>
</ZIcon>

<ZIcon color="blue" size="60">
  <CashOutline/>
</ZIcon>
</div>

```vue
<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5';
</script>
<template>
  <ZIcon color="red" size="40">
    <CashOutline />
  </ZIcon>
</template>
```

## API

### Icon Props

| 名称  | 类型             | 默认值    | 说明     |
| ----- | ---------------- | --------- | -------- |
| color | string           | undefined | 图标颜色 |
| size  | number \| string | undefined | 图片大小 |
