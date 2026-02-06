# Yannis175.github.io

> Yannis 的个人技术博客 — Hope and Wait.

该仓库存放的是 Yannis 的个人博客静态站点（ Hexo + Chic 主题构建后的产物）。项目已经过 Hexo 生成，可直接部署到 GitHub Pages 或任意静态托管平台。

## 技术栈

| 技术 | 用途 |
|------|------|
| [Hexo](https://hexo.io) + [Chic](https://github.com/Siricee/hexo-theme-Chic) | 静态博客生成与主题 |
| HTML / CSS / SCSS | 页面结构与样式 |
| JavaScript | 交互逻辑（主题切换、移动端菜单） |
| MathJax | 数学公式渲染 |
| Gitalk | 基于 GitHub Issues 的评论系统 |
| 不蒜子 | 访客统计 |
| tocbot | 文章目录自动生成 |

## 作者视角

我是 Yannis，这个仓库承载了我在 2019-2020 年间的学习记录。那段时间我主要围绕 C 语言、Java、微信小程序和高数等课程做笔记，也在不断尝试 Hexo 主题与前端样式的调整。你在 `2019/`、`2020/` 目录里看到的每一篇文章，都是当时熬夜整理的练习与心得；而 `css/`、`style.scss` 的改动，则是我想让博客既简洁又不失个人风格的尝试。如果你也是在学习这些内容，希望这些静态页面能给你一点启发；如果你只是路过，那就把它当作我成长路上的一份时间胶囊吧。

## 目录概览

```
├── index.html          # 站点首页（导航、头像、社交链接）
├── about/              # 关于页
├── 2019/, 2020/        # 博客文章（按 年/月/日/标题 组织）
├── archives/           # 归档页
├── categories/, category/ # 分类页
├── tags/, tag/         # 标签页
├── page/               # 分页
├── css/                # 样式文件（style.css, base.css, layout.css 等）
├── js/                 # 脚本（script.js, main.js, tocbot, mathjax）
├── img/, image/        # 图片资源
├── font/, fonts/       # 字体资源（含 iconfont）
├── style.scss          # SCSS 源文件（仅供参考，_scss/ 不在本仓库中）
└── docs/               # 项目文档
```

## 常见操作

1. **本地预览**：可使用 `npx serve .` 或任意静态服务器在仓库根目录启动，浏览器访问 `http://localhost:3000`（或终端提示的端口）。
2. **更新样式**：直接编辑 `css/` 下对应文件即可。`style.scss` 仅供参考，其依赖的 `_scss/` 目录不在本仓库中，无法直接编译。
3. **发布到 GitHub Pages**：把本仓库内容 push 到 `Yannis175/Yannis175.github.io` 主分支，GitHub 会自动托管。

## 注意事项

- 由于仓库已经是构建结果，Hexo 源文件（如 `_config.yml`、`themes/`、`source/` 等）不在此目录；若需改动文章内容，建议回到 Hexo 源项目编辑后重新生成。
- 站点依赖自带的字体、图片和脚本文件，请保持相对路径结构不变，以免引用失效。

## 文档

- [快速开始](docs/guides/getting-started.md)
- [开发指南](docs/guides/development.md)
- [部署指南](docs/guides/deployment.md)
- [架构概览](docs/architecture/overview.md)
- [贡献指南](CONTRIBUTING.md)
- [变更日志](CHANGELOG.md)

## License

© Yannis
