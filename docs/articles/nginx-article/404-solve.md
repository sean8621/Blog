# 部署成功 404 页面解决方案

## 一.配合 browserHistory 使用

```bash
location / { # 用于配合 browserHistory 使用
    try_files $uri $uri/ /index.html;
}
```
