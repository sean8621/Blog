import { defineConfig } from "vitepress";
import mdItCustomAttrs from "markdown-it-custom-attrs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sean86 Blog",
  description: "Personal Study Blog",
  lang: "zh-CN",
  base: "/Blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/articles/vue-article/scroll-list-components" },
    ],
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      "/articles/": [
        {
          text: "Vue",
          // collapsed: true,
          items: [
            {
              text: "自动滚动列表",
              link: "/articles/vue-article/scroll-list-components",
            },
            {
              text: "echarts组件",
              link: "/articles/vue-article/echarts",
            },
            {
              text: "Element-ui Tab 组件切换时 Echarts 解决宽度 100% 问题",
              link: "/articles/vue-article/element-tabpan-echarts",
            },
            {
              text: "v-if与v-for",
              link: "/articles/vue-article/vIf-vFor",
            },
            {
              text: "Vue2/3区别",
              link: "/articles/vue-article/vue2-vue3diff",
            },
            {
              text: "Vue3-ts 对接腾讯地图问题",
              link: "/articles/vue-article/vue3-ts-txmap",
            },
          ],
        },
        {
          text: "React",
          // collapsed: true,
          items: [
            {
              text: "reactTips",
              link: "/articles/react-article/react-tips",
            },
          ],
        },
        {
          text: "CSS",
          items: [
            {
              text: "反向圆角",
              link: "/articles/css-article/reverse-border-radius",
            },
            {
              text: "气泡对话框",
              link: "/articles/css-article/bubble-dialog",
            },
            {
              text: "content-visibility 优化渲染性能",
              link: "/articles/css-article/content-visibility",
            },
            {
              text: "CSS Tips",
              link: "/articles/css-article/css-tips",
            },
          ],
        },
        {
          text: "JS",
          items: [
            {
              text: "html2canvas线上图片资源上传",
              link: "/articles/js-article/html2canvas-upload",
            },
            {
              text: "Echarts使用小技巧",
              link: "/articles/js-article/echarts-use-tips",
            },
            {
              text: "数组遍历",
              link: "/articles/js-article/array-traversal",
            },
            {
              text: "TS使用技巧",
              link: "/articles/js-article/ts-tips",
            },
            {
              text: "JS手写题",
              link: "/articles/js-article/js-handwriting",
            },
          ],
        },
        {
          text: "Uni-App",
          items: [
            { text: "uniapp踩坑", link: "/articles/uniapp-article/dev-Pit" },
            {
              text: "进度条动画",
              link: "/articles/uniapp-article/breath-animation",
            },
            {
              text: "全局开启分享功能",
              link: "/articles/uniapp-article/gloable-share",
            },
          ],
        },
        {
          text: "Nginx",
          items: [
            {
              text: "清除页面缓存",
              link: "/articles/nginx-article/clear-html-cache",
            },
          ],
        },
        {
          text: "其他",
          items: [
            {
              text: "搭建项目配置",
              link: "/articles/other-article/esLint",
            },
            {
              text: "函数重载",
              link: "/articles/other-article/funtion-overload",
            },
            {
              text: "Git 使用技巧",
              link: "/articles/other-article/git",
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/sean8621" }],
  },
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, "image", {
        "data-fancybox": "gallery",
      });
    },
  },
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
      },
    ],
  ],
});
