# 贡献指南

感谢你对 Yannis's Blog 的关注！以下是参与贡献的指南。

## 开发环境

### 前置要求

- Git
- 任意静态文件服务器（推荐 `npx serve`）
- （可选）Sass 编译器，用于修改 SCSS

### 本地启动

```bash
git clone https://github.com/Yannis175/Yannis175.github.io.git
cd Yannis175.github.io
npx serve .
```

## 提交规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>: <description>

[optional body]
```

### 常用类型

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 Bug |
| `docs` | 文档变更 |
| `style` | 样式调整（不影响逻辑） |
| `refactor` | 代码重构 |
| `chore` | 构建/工具变更 |

### 示例

```
docs: 添加 README 及作者说明
style: 调整移动端导航栏间距
fix: 修复暗色模式下代码块背景色
```

## Pull Request 流程

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交更改并推送
4. 创建 Pull Request，描述你的改动

### PR 检查清单

- [ ] 本地预览确认页面正常显示
- [ ] 移动端和桌面端均已测试
- [ ] 暗色/亮色模式均已检查
- [ ] 提交信息符合规范

## 注意事项

- 本仓库是 Hexo 构建产物，新增文章请在 Hexo 源项目中操作
- 修改样式时注意保持响应式布局的兼容性
- 请勿提交包含敏感信息的文件
