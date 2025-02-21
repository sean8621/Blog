<script setup>
import { ref, watch, onMounted } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

// 配置 pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// 接收父组件传入的 PDF 地址
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});

const pages = ref([]);

// 渲染 PDF
const renderPDF = async (url) => {
  pages.value = []; // 清空已有页面
  const pdf = await pdfjsLib.getDocument(url).promise;
  const totalPages = pdf.numPages;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = { canvasContext: context, viewport };
    await page.render(renderContext).promise;

    // 存储页面图像
    pages.value.push(canvas.toDataURL("image/png"));
  }
};

// 组件挂载时渲染 PDF
onMounted(() => {
  renderPDF("/Blog/" + props.pdfUrl);
});

// 监听 PDF 地址变化，重新渲染
watch(
  () => props.pdfUrl,
  (newUrl) => {
    renderPDF("/Blog/" + newUrl);
  }
);
</script>

<template>
  <div>
    <div
      v-for="(page, index) in pages"
      :key="index"
      style="margin-bottom: 10px"
    >
      <img :src="page" alt="PDF Page" style="width: 100%; max-width: 800px" />
    </div>
  </div>
</template>
