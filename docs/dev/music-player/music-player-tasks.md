---
feature: music-player
complexity: standard
phase: tasks
generated_at: 2026-02-06
version: 1
parallel_groups:
  - group: 1
    tasks: [T-001, T-002, T-003]
    mode: parallel
  - group: 2
    tasks: [T-004]
    mode: serial
    depends_on: [1]
  - group: 3
    tasks: [T-005, T-006]
    mode: parallel
    depends_on: [2]
  - group: 4
    tasks: [T-007]
    mode: serial
    depends_on: [3]
---

# 任务清单: 博客音乐播放器

> **功能标识**: music-player
> **基于设计**: music-player-design.md v1
> **任务总数**: 7

## 任务总览

| ID | 任务 | 优先级 | 预估 | 依赖 | 状态 |
|----|------|--------|------|------|------|
| T-001 | 创建播放器 CSS 样式文件 | P0 | S | 无 | ☐ |
| T-002 | 创建播放器 JS 核心逻辑 | P0 | M | 无 | ☐ |
| T-003 | 创建歌曲配置文件和目录 | P0 | S | 无 | ☐ |
| T-004 | 修改所有 HTML 页面集成播放器 | P0 | M | T-001,T-002,T-003 | ☐ |
| T-005 | 实现歌曲列表面板和音量控制 | P1 | S | T-004 | ☐ |
| T-006 | 实现深浅色主题适配 | P1 | S | T-004 | ☐ |
| T-007 | 实现 localStorage 状态记忆和移动端适配 | P2 | S | T-005,T-006 | ☐ |

## 任务详情

### T-001: 创建播放器 CSS 样式文件

**文件**: `/css/music-player.css`（新增）

**实施内容**:
1. 创建 `/css/music-player.css`
2. 实现播放器吸底布局（fixed 定位）
3. 实现进度条样式（可点击区域）
4. 实现控制按钮样式
5. 实现基础响应式（移动端简化）

**验收标准**:
- 播放器固定在页面底部
- 进度条可视且可交互
- 按钮有 hover 效果

---

### T-002: 创建播放器 JS 核心逻辑

**文件**: `/js/music-player.js`（新增）

**实施内容**:
1. 创建 IIFE 模块 `MusicPlayer`
2. 实现 `loadPlaylist()` — fetch music.json
3. 实现 `play()` / `pause()` — HTML5 Audio 控制
4. 实现 `prev()` / `next()` — 循环切歌
5. 实现 `seek()` — 进度条拖拽/点击跳转
6. 实现 `updateProgress()` — 实时进度更新
7. 实现 `init()` — 入口函数，DOMContentLoaded 触发
8. fetch 失败时优雅降级（隐藏播放器）

**验收标准**:
- 能加载 music.json 并播放音频
- 播放/暂停/切歌功能正常
- 进度条实时更新且可拖拽
- 配置文件不存在时不报错

---

### T-003: 创建歌曲配置文件和目录

**文件**: `/music/music.json`（新增）

**实施内容**:
1. 创建 `/music/` 目录
2. 创建 `/music/music.json` 示例配置
3. 包含 2-3 首示例条目（src 指向占位路径）

**验收标准**:
- JSON 格式正确
- 包含 title、artist、src 字段

---

### T-004: 修改所有 HTML 页面集成播放器

**文件**: 所有 56 个 `index.html` + `css/style.css`

**实施内容**:
1. 在每个 HTML 的 `<head>` 中 `</head>` 前添加 CSS 引用
2. 在每个 HTML 的 `</body>` 前添加播放器 HTML 结构和 JS 引用
3. 修改 `css/style.css` 中 `.footer` 增加 `padding-bottom: 70px`
4. 使用脚本批量处理所有 HTML 文件

**验收标准**:
- 所有页面底部显示播放器
- footer 不被播放器遮挡
- 页面间导航播放器始终可见

---

### T-005: 实现歌曲列表面板和音量控制

**文件**: `/js/music-player.js`（修改）、`/css/music-player.css`（修改）

**实施内容**:
1. 实现 `togglePlaylist()` — 展开/收起列表
2. 实现 `renderPlaylist()` — 渲染歌曲列表 DOM
3. 实现列表项点击切歌
4. 实现 `setVolume()` — 音量滑块控制
5. 实现 `toggleMute()` — 静音切换
6. 添加列表面板和音量控件 CSS

**验收标准**:
- 点击列表按钮展开/收起歌曲列表
- 点击列表中歌曲可切换播放
- 音量滑块可调节音量
- 静音按钮可切换

---

### T-006: 实现深浅色主题适配

**文件**: `/css/music-player.css`（修改）

**实施内容**:
1. 添加 `.dark-theme .music-player` 系列样式
2. 深色模式: 背景 `#1e1f21`，文字 `#a9a9b3`，边框 `#3a3b3d`
3. 确保主题切换时播放器平滑过渡（transition）

**验收标准**:
- 切换深色模式后播放器自动变为深色
- 切换浅色模式后播放器恢复浅色
- 过渡动画平滑

---

### T-007: 实现 localStorage 状态记忆和移动端适配

**文件**: `/js/music-player.js`（修改）、`/css/music-player.css`（修改）

**实施内容**:
1. 实现 `saveState()` — 保存歌曲索引、进度、音量到 localStorage
2. 实现 `restoreState()` — 页面加载时恢复状态
3. 在 play/pause/切歌/调音量时触发 saveState
4. 完善 `@media (max-width: 768px)` 响应式样式
5. 移动端隐藏音量滑块和时间显示

**验收标准**:
- 刷新页面后恢复歌曲索引和音量
- 移动端布局简洁可用
- 首次访问默认音量 80%
