# Element-ui Tab 组件切换时 Echarts 解决宽度 100% 问题

问题描述：vue+element 项目中使用到了 tab 切换选项卡，其中有一个 tab 下的内容是 echarts，出现了 echarts 宽度缩减为 100px 无法继承 100%属性。
原因：echarts 渲染时 tab 选项卡 display 为 none，所以 width：100%没有可继承项，被 echarts 自带方法切割成 100px。
解决思路：销毁组件，在 tab 选项卡被选中时重新渲染组件，这个时候就会有宽度继承。

## 第一种 通过 v-if 重新渲染组件

```vue
<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="demo1" name="1">
        <BarCharts v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane label="demo2" name="2">
        <BarCharts v-if="activeName === '2'" />
      </el-tab-pane>
      <el-tab-pane label="demo3" name="3">
        <BarCharts v-if="activeName === '3'" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
    };
  },
  methods: {
    // 切换标签事件
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
  },
};
</script>
```

## 第二种 延时调用 echart 的 resize()方法即可

```vue
<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="demo1" name="1">
        <BarCharts ref="1" />
      </el-tab-pane>
      <el-tab-pane label="demo2" name="2">
        <BarCharts ref="2" />
      </el-tab-pane>
      <el-tab-pane label="demo3" name="3">
        <BarCharts ref="3" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
    };
  },
  methods: {
    // 切换标签事件
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$nextTick(() => {
        this.$refs[tab.name].chart.resize();
      });
    },
  },
};
</script>
```

## 第三种 给标签添加 lazy 属性

```vue
<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="demo1" name="1" :lazy="true">
        <BarCharts />
      </el-tab-pane>
      <el-tab-pane label="demo2" name="2" :lazy="true">
        <BarCharts />
      </el-tab-pane>
      <el-tab-pane label="demo3" name="3" :lazy="true">
        <BarCharts />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
    };
  },
  methods: {
    // 切换标签事件
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
  },
};
</script>
```
