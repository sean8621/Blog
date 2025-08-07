// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Preview from "./preview/index.vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/base16/summerfruit-light.css"; // 主题

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("preview", Preview);
    app.use(hljsVuePlugin);
  },
} satisfies Theme;
