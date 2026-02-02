const n=`<!-- docs/.vitepress/components/EmbeddedWeb.vue -->
<template>
  <div class="embedded-web-container">
    <iframe
      :src="src"
      :width="width"
      :height="height"
      frameborder="0"
      scrolling="auto"
      :title="title"
      class="embedded-iframe"
    ></iframe>
  </div>
</template>

<script setup>
// 定义组件属性，支持外部传参，提升灵活性
const props = defineProps({
  // 内嵌网页地址（必传）
  src: {
    type: String,
    required: true
  },
  // 宽度（默认 100%）
  width: {
    type: String,
    default: '100%'
  },
  // 高度（默认 600px）
  height: {
    type: String,
    default: '100%'
  },
  // 标题（默认 内嵌网页）
  title: {
    type: String,
    default: '内嵌网页'
  }
})
<\/script>

<style scoped>
/* 可选：添加响应式优化，避免移动端变形 */
.embedded-web-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px; /* 可选：圆角效果 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 可选：阴影效果 */
}

.embedded-iframe {
  border: none;
  transition: all 0.3s ease;
}

/* 移动端适配：小屏幕下调整高度 */
@media (max-width: 768px) {
  .embedded-iframe {
    height: 400px !important;
  }
}
</style>`;export{n as default};
