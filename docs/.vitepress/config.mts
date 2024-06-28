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
      { text: "文章", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Vue",
        items: [
          { text: "滚动组件", link: "/vue-article/scroll-list-components" },
        ],
      },
      {
        text: "CSS",
        items: [
          { text: "反向圆角", link: "/css-article/reverse-border-radius" },
        ],
      },
      {
        text: "JS",
        items: [
          {
            text: "html2canvas线上图片资源上传",
            link: "/js-article/html2canvas-upload",
          },
          {
            text: "Echarts使用小技巧",
            link: "/js-article/echarts-use-tips",
          },
        ],
      },
      {
        text: "Uni-App",
        items: [{ text: "uniapp踩坑", link: "/uniapp-article/dev-Pit" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/sean8621" },
    ],
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
