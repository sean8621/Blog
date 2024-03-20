import { defineConfig } from "vitepress";

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
        ],
      },
      {
        text: "Uni-App",
        items: [{ text: "uniapp踩坑", link: "/uniapp-article/dev-Pit" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
});
