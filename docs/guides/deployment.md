# 部署指南

## GitHub Pages（默认方式）

本仓库直接部署在 GitHub Pages 上。

### 部署步骤

1. 将代码推送到 `Yannis175/Yannis175.github.io` 仓库的主分支
2. GitHub 自动识别并托管静态文件
3. 访问 `https://yannis175.github.io` 查看站点

```bash
git add .
git commit -m "update site"
git push origin master
```

### 自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件，写入自定义域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `yannis175.github.io`

## 其他静态托管平台

本站点为纯静态文件，可部署到任意静态托管服务：

- **Vercel**: 导入 GitHub 仓库，零配置部署
- **Netlify**: 拖拽上传或连接 GitHub 仓库
- **Cloudflare Pages**: 连接 GitHub 仓库自动部署

## 注意事项

- 确保所有资源路径使用相对路径或以 `/` 开头的绝对路径
- favicon 当前使用外部 CDN 链接，如需离线部署请替换为本地文件
