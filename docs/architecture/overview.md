# 架构概览

## 站点类型

Yannis's Blog 是一个由 Hexo 静态博客生成器构建的个人博客站点。本仓库存放的是 **构建后的静态产物**，而非 Hexo 源文件。

## 整体架构

```
浏览器请求
    │
    ▼
GitHub Pages (静态托管)
    │
    ▼
index.html (首页入口)
    ├── css/style.css (主样式)
    ├── js/script.js (主题切换、DOM ready)
    ├── js/main.js (站内搜索)
    ├── js/tocbot.min.js (文章目录)
    ├── js/mathjax2.7.5.js (公式渲染)
    ├── js/md5.js (Gitalk ID 生成)
    └── Gitalk (评论系统，依赖 GitHub API)
```

## 页面组织

- **首页** (`index.html`): 头像、简介、社交链接
- **文章页** (`2019/`, `2020/`): 按 `年/月/日/标题/index.html` 组织
- **归档页** (`archives/`): 按时间线列出所有文章
- **分类页** (`categories/`, `category/`): 按分类浏览
- **标签页** (`tags/`, `tag/`): 按标签浏览
- **关于页** (`about/`): 博主介绍

## 第三方依赖

| 依赖 | 用途 | 加载方式 |
|------|------|----------|
| Gitalk | 评论系统 | CDN |
| MathJax | 数学公式 | 本地 |
| tocbot | 文章目录 | 本地 |
| md5.js | Gitalk 评论 ID 生成 | 本地 + CDN |
| 不蒜子 | 访客统计 | CDN |
| iconfont | 图标字体 | 本地 |

## 功能模块

| 模块 | 文件 | 说明 |
|------|------|------|
| 主题切换 | `js/script.js` | 暗色/亮色模式，状态存储在 localStorage |
| 站内搜索 | `js/main.js` | 基于 `search.json` 的客户端搜索 |
| 文章目录 | `js/tocbot.min.js` | 自动从文章标题生成侧边目录 |
| 公式渲染 | `js/mathjax2.7.5.js` | LaTeX 数学公式支持 |
| 移动端菜单 | 内联脚本 | 汉堡菜单展开/收起（各页面 `<script>` 标签内） |
