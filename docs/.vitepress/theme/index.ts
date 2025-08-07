// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Preview from "./preview/index.vue";
import "highlight.js/styles/base16/summerfruit-light.css"; // 主题
import highlightjs from "@highlightjs/vue-plugin";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("preview", Preview);
    app.use(highlightjs);
  },
} satisfies Theme;
