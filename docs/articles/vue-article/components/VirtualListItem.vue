<template>
  <li :key="item.brandId" :style="{height: `${item.height}px`, 'line-height': `${item.height}px`}" ref="node">
    <div>
      <div>{{item.name}}</div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      default() {
        return {}
      },
      type: Object
    },
    index: Number
  },
  data() {
    return {
      
    }
  },
  mounted() {
    this.$emit('update-height', {height: this.$refs.node.getBoundingClientRect().height, index: this.index})
  }
}
</script>
