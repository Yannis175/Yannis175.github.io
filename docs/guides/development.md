# 开发指南

> 技术栈详情见 [README.md](../../README.md#技术栈)

## 修改样式

本仓库是 Hexo 构建后的产物，直接编辑 `css/` 目录下的对应文件即可：

- `css/style.css` — 主样式（编译产物）
- `css/base.css` — 基础样式
- `css/layout.css` — 布局
- `css/media.css` — 响应式断点
- `css/variable.css` — CSS 变量
- `css/custom.css` — 自定义样式

> **注意**：根目录的 `style.scss` 仅供参考，其依赖的 `_scss/` 目录不在本仓库中，无法直接编译。如需通过 SCSS 修改样式，请回到 Hexo 源项目操作。

## 修改页面内容

直接编辑对应的 `index.html` 文件。注意保持相对路径结构不变。

## 注意事项

- Hexo 源文件（`_config.yml`、`themes/`、`source/`）不在本仓库
- 如需新增文章，建议回到 Hexo 源项目编辑后重新生成
- 修改时注意保持字体、图片等资源的相对路径
