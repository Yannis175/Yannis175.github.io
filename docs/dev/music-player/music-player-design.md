---
feature: music-player
complexity: standard
phase: design
generated_at: 2026-02-06
version: 1
---

# 技术设计文档: 博客音乐播放器

> **功能标识**: music-player
> **复杂度**: standard
> **基于需求**: music-player-requirements.md v1

## 1. 架构概览

### 1.1 整体方案

采用纯前端方案，新增 3 个文件 + 修改所有现有 HTML 页面：

```
新增文件:
  /css/music-player.css    — 播放器样式（含深浅色主题）
  /js/music-player.js      — 播放器逻辑（HTML5 Audio API）
  /music/music.json         — 歌曲配置

修改文件:
  所有 index.html 页面     — 在 </body> 前插入播放器 HTML + 引用 CSS/JS
  /css/style.css           — .footer 增加 padding-bottom
```

### 1.2 技术选型

| 方面 | 选择 | 理由 |
|------|------|------|
| JS 框架 | Vanilla JS | 与现有代码一致，无依赖 |
| 音频 API | HTML5 Audio | 浏览器原生支持，无需库 |
| 图标 | Unicode/CSS | 避免引入额外图标库 |
| 状态存储 | localStorage | 与现有主题切换机制一致 |

## 2. 组件设计

### 2.1 播放器 HTML 结构

```html
<!-- 插入位置: </body> 前，footer 后 -->
<div id="music-player" class="music-player">
  <div class="music-player-bar">
    <!-- 进度条 -->
    <div class="music-progress-wrap">
      <div class="music-progress-bar">
        <div class="music-progress-current"></div>
      </div>
    </div>
    <!-- 控制区 -->
    <div class="music-controls">
      <div class="music-info">
        <span class="music-title">未选择歌曲</span>
        <span class="music-artist"></span>
      </div>
      <div class="music-buttons">
        <button class="music-btn music-prev" title="上一首">⏮</button>
        <button class="music-btn music-play" title="播放">▶</button>
        <button class="music-btn music-next" title="下一首">⏭</button>
      </div>
      <div class="music-right">
        <span class="music-time">0:00 / 0:00</span>
        <div class="music-volume-wrap">
          <button class="music-btn music-mute" title="静音">🔊</button>
          <input type="range" class="music-volume" min="0" max="100" value="80">
        </div>
        <button class="music-btn music-list-btn" title="歌曲列表">☰</button>
      </div>
    </div>
  </div>
  <!-- 歌曲列表面板 -->
  <div class="music-playlist" style="display:none;">
    <ul class="music-playlist-items"></ul>
  </div>
</div>
```

### 2.2 CSS 设计

**布局策略**:
- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999`
- 播放器高度: 60px（桌面）/ 50px（移动端）
- footer 增加对应 padding-bottom 避免遮挡

**主题适配**:
- 浅色: 白色背景 `#fff`，深色文字 `#333`，边框 `#e0e0e0`
- 深色: 复用 `.dark-theme` 选择器，背景 `#1e1f21`，文字 `#a9a9b3`，边框 `#3a3b3d`

**响应式**:
- `@media (max-width: 768px)`: 隐藏时间显示和音量滑块，简化布局

### 2.3 JS 模块设计

```
MusicPlayer (IIFE 模块)
├── init()              — 入口：加载配置、绑定事件、恢复状态
├── loadPlaylist()      — fetch music.json，解析歌曲列表
├── play() / pause()    — 播放/暂停控制
├── prev() / next()     — 切歌（循环列表）
├── seek(position)      — 进度跳转
├── setVolume(val)      — 音量设置
├── toggleMute()        — 静音切换
├── togglePlaylist()    — 展开/收起歌曲列表
├── renderPlaylist()    — 渲染歌曲列表 DOM
├── updateProgress()    — 实时更新进度条（requestAnimationFrame）
├── saveState()         — 保存状态到 localStorage
└── restoreState()      — 从 localStorage 恢复状态
```

## 3. 数据流

```
music.json → fetch → playlist[] → Audio.src
                                      ↓
User Click → play/pause/next/prev → Audio API → timeupdate → UI 更新
                                      ↓
                              localStorage ← saveState()
```

## 4. 集成方案

### 4.1 HTML 页面修改

每个 HTML 页面需要在 `<head>` 中添加 CSS 引用，在 `</body>` 前添加播放器 HTML 和 JS 引用。

由于有 56 个 HTML 文件，采用统一的插入模板：

**`<head>` 中添加**:
```html
<link rel="stylesheet" href="/css/music-player.css">
```

**`</body>` 前添加**:
```html
<!-- Music Player -->
<div id="music-player" class="music-player">...</div>
<script src="/js/music-player.js"></script>
```

### 4.2 Footer 间距

在 `css/style.css` 中修改 `.footer` 增加 `padding-bottom: 70px`。

## 5. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 56 个 HTML 文件需逐一修改 | 工作量大 | 使用脚本批量插入 |
| 音频文件体积大 | 加载慢 | 仅在用户点击播放时加载音频 |
| music.json 不存在 | 播放器报错 | fetch 失败时优雅降级，隐藏播放器 |
| 移动端 Audio API 限制 | 自动播放被阻止 | 设计为用户主动触发，不自动播放 |
