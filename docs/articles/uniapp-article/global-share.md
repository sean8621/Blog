# 微信小程序开启分享功能

- 通过 mixin 全局开启分享
- 根据白名单开启指定页面的分享功能

## share.ts

```ts
export default {
  onLoad() {
    //白名单
    const urlList = ["pages/index/index", "pages/example/example"];
    //获取路由信息
    const pages = getCurrentPages();
    //获取当前路由
    let nowPage = pages[pages.length - 1];
    //判断不包含有白名单的路由就禁用
    if (urlList.includes(nowPage.route!)) {
      uni.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"],
      });
    } else {
      uni.hideShareMenu({} as UniApp.HideShareMenuOptions);
    }
  },
};
```

## main.ts 全局挂载 mixin

```ts
import { createSSRApp } from "vue";
import App from "./App.vue";
import share from "@/utils/share";
export function createApp() {
  const app = createSSRApp(App);
  app.mixin(share);
  return {
    app,
    share,
  };
}
```
