# 快速开始

## 环境要求

- 任意静态文件服务器（如 `npx serve`、Python `http.server`、Nginx 等）
- 浏览器（推荐 Chrome / Firefox）

## 本地预览

```bash
# 方式一：使用 npx serve
npx serve .

# 方式二：使用 Python
python3 -m http.server 3000

# 方式三：使用 VS Code Live Server 插件
# 右键 index.html -> Open with Live Server
```

浏览器访问终端提示的地址（通常为 `http://localhost:3000` 或 `http://localhost:5000`）即可预览站点。

## 项目结构速览

```
├── index.html          # 站点首页
├── about/              # 关于页
├── 2019/, 2020/        # 按年份组织的博客文章
├── archives/           # 归档页
├── categories/         # 分类页
├── tags/               # 标签页
├── css/                # 样式文件
├── js/                 # 脚本文件
├── img/, image/        # 图片资源
└── font/, fonts/       # 字体资源
```

## 下一步

- 阅读 [开发指南](./development.md) 了解如何修改站点
- 阅读 [部署指南](./deployment.md) 了解如何发布
