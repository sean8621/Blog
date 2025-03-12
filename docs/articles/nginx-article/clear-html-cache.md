# nginx 清除页面缓存

- 有时候项目重新部署后用户端访问到的还是旧的页面，这是因为 nginx 缓存了旧的页面，所以需要清除缓存。

## 配置文件

```bash
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;
        index index.html index.htm;

        # 清除缓存
        add_header Cache-Control 'no-cache, no-store, must-revalidate';
        add_header Pragma 'no-cache';
        expires 0;
    }
}
```
