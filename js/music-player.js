/**
 * Music Player - Blog Background Music Player
 * Pure vanilla JS, no dependencies
 */
(function () {
  'use strict';

  var audio = new Audio();
  var playlist = [];
  var currentIndex = 0;
  var isPlaying = false;
  var isMuted = false;
  var previousVolume = 80;
  var playlistVisible = false;

  // DOM references (populated in init)
  var dom = {};

  // ========================================
  // Playlist Loading
  // ========================================

  function loadPlaylist() {
    return fetch('/music/music.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load music.json');
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Empty playlist');
        }
        playlist = data;
        loadTrack(currentIndex);
        renderPlaylist();
      })
      .catch(function () {
        // Graceful degradation: hide player if no config
        var player = document.getElementById('music-player');
        if (player) player.classList.add('hidden');
      });
  }

  function loadTrack(index) {
    if (!playlist[index]) return;
    var track = playlist[index];
    audio.src = track.src;
    audio.preload = 'metadata';
    dom.title.textContent = track.title || '未知歌曲';
    dom.artist.textContent = track.artist || '未知艺术家';
    updatePlaylistActive();
  }

  // ========================================
  // Playback Controls
  // ========================================

  function play() {
    if (!playlist.length) return;
    audio.play().then(function () {
      isPlaying = true;
      dom.playBtn.textContent = '⏸';
      dom.playBtn.title = '暂停';
      saveState();
    }).catch(function () {
      // Autoplay blocked by browser - ignore
    });
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    dom.playBtn.textContent = '▶';
    dom.playBtn.title = '播放';
    saveState();
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    if (isPlaying) play();
    saveState();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
    if (isPlaying) play();
    saveState();
  }

  function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    loadTrack(currentIndex);
    play();
  }

  // ========================================
  // Progress Control
  // ========================================

  function updateProgress() {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    dom.progressCurrent.style.width = pct + '%';
    dom.time.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
  }

  function seek(e) {
    if (!audio.duration) return;
    var rect = dom.progressWrap.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    audio.currentTime = pct * audio.duration;
    updateProgress();
  }

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // ========================================
  // Volume Control
  // ========================================

  function setVolume(val) {
    val = Math.max(0, Math.min(100, val));
    audio.volume = val / 100;
    dom.volumeSlider.value = val;
    if (val === 0) {
      isMuted = true;
      dom.muteBtn.textContent = '🔇';
    } else {
      isMuted = false;
      dom.muteBtn.textContent = '🔊';
      previousVolume = val;
    }
    saveState();
  }

  function toggleMute() {
    if (isMuted) {
      setVolume(previousVolume || 80);
    } else {
      previousVolume = parseInt(dom.volumeSlider.value) || 80;
      setVolume(0);
    }
  }

  // ========================================
  // Playlist Panel
  // ========================================

  function togglePlaylist() {
    playlistVisible = !playlistVisible;
    dom.playlist.style.display = playlistVisible ? 'block' : 'none';
  }

  function closePlaylist() {
    playlistVisible = false;
    dom.playlist.style.display = 'none';
  }

  function renderPlaylist() {
    var ul = dom.playlistItems;
    ul.innerHTML = '';
    playlist.forEach(function (track, i) {
      var li = document.createElement('li');
      li.innerHTML =
        '<span class="playlist-title">' + escapeHtml(track.title || '未知歌曲') + '</span>' +
        '<span class="playlist-artist">' + escapeHtml(track.artist || '') + '</span>';
      if (i === currentIndex) li.classList.add('active');
      li.addEventListener('click', function () {
        playTrack(i);
      });
      ul.appendChild(li);
    });
  }

  function updatePlaylistActive() {
    if (!dom.playlistItems) return;
    var items = dom.playlistItems.querySelectorAll('li');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', i === currentIndex);
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ========================================
  // State Persistence (localStorage)
  // ========================================

  function saveState() {
    try {
      var state = {
        index: currentIndex,
        time: audio.currentTime || 0,
        volume: parseInt(dom.volumeSlider.value) || 80,
        muted: isMuted,
        playing: isPlaying
      };
      window.localStorage.setItem('musicPlayerState', JSON.stringify(state));
    } catch (e) {
      // localStorage unavailable - ignore
    }
  }

  function restoreState() {
    try {
      var raw = window.localStorage.getItem('musicPlayerState');
      if (!raw) return;
      var state = JSON.parse(raw);
      if (typeof state.index === 'number' && state.index >= 0 && state.index < playlist.length) {
        currentIndex = state.index;
        loadTrack(currentIndex);
      }
      if (typeof state.volume === 'number') {
        setVolume(state.muted ? 0 : state.volume);
        if (state.muted) previousVolume = state.volume;
      }
      // Restore playback position and auto-resume if was playing
      var shouldPlay = state.playing;
      var savedTime = state.time;
      if (typeof savedTime === 'number' && savedTime > 0) {
        audio.addEventListener('loadedmetadata', function onMeta() {
          audio.currentTime = savedTime;
          audio.removeEventListener('loadedmetadata', onMeta);
          if (shouldPlay) {
            play();
          }
        });
        // If metadata already loaded (cached), fire manually
        if (audio.readyState >= 1) {
          audio.currentTime = savedTime;
          if (shouldPlay) {
            play();
          }
        }
      } else if (shouldPlay) {
        play();
      }
    } catch (e) {
      // Corrupted state - ignore
    }
  }

  // ========================================
  // Pjax - Seamless Page Navigation
  // ========================================

  function reinitTheme() {
    var isDark = document.body.classList.contains('dark-theme');
    var checkbox = document.getElementById('switch_default');
    var mobileToggle = document.getElementById('mobile-toggle-theme');
    if (checkbox) checkbox.checked = isDark;
    if (mobileToggle) mobileToggle.innerText = isDark ? '· Dark' : '· Light';

    var toggleBtn = document.querySelector('.toggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        window.localStorage && window.localStorage.setItem('theme',
          document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        reinitTheme();
      });
    }
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        window.localStorage && window.localStorage.setItem('theme',
          document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        reinitTheme();
      });
    }
  }

  function isSameOriginLink(a) {
    return a.hostname === location.hostname && !a.hasAttribute('target') &&
      a.href && !a.href.startsWith('javascript') && a.protocol === location.protocol;
  }

  function pjaxNavigate(url) {
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('fetch failed');
        return res.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var newDoc = parser.parseFromString(html, 'text/html');

        // Update page title
        document.title = newDoc.title;

        // Replace .wrapper content (everything except the music player)
        var newWrapper = newDoc.querySelector('.wrapper');
        var oldWrapper = document.querySelector('.wrapper');
        if (newWrapper && oldWrapper) {
          oldWrapper.innerHTML = newWrapper.innerHTML;
        }

        // Re-run inline scripts inside .wrapper (e.g. mobileBtn)
        var scripts = oldWrapper.querySelectorAll('script');
        for (var i = 0; i < scripts.length; i++) {
          var s = document.createElement('script');
          s.textContent = scripts[i].textContent;
          scripts[i].parentNode.replaceChild(s, scripts[i]);
        }

        // Re-init theme toggle after content swap
        reinitTheme();

        // Re-bind pjax links in new content
        bindPjaxLinks();

        // Update browser URL
        history.pushState(null, '', url);

        // Scroll to top
        window.scrollTo(0, 0);
      })
      .catch(function () {
        // Fallback: normal navigation if fetch fails
        location.href = url;
      });
  }

  function bindPjaxLinks() {
    var links = document.querySelectorAll('.wrapper a');
    for (var i = 0; i < links.length; i++) {
      (function (link) {
        if (!isSameOriginLink(link) || link.dataset.pjax === 'bound') return;
        link.dataset.pjax = 'bound';
        link.addEventListener('click', function (e) {
          e.preventDefault();
          pjaxNavigate(link.href);
        });
      })(links[i]);
    }
  }

  // Handle browser back/forward
  window.addEventListener('popstate', function () {
    pjaxNavigate(location.href);
  });

  // ========================================
  // Initialization
  // ========================================

  function init() {
    var player = document.getElementById('music-player');
    if (!player) return;

    // Cache DOM references
    dom.title = player.querySelector('.music-title');
    dom.artist = player.querySelector('.music-artist');
    dom.playBtn = player.querySelector('.music-play');
    dom.prevBtn = player.querySelector('.music-prev');
    dom.nextBtn = player.querySelector('.music-next');
    dom.progressWrap = player.querySelector('.music-progress-wrap');
    dom.progressCurrent = player.querySelector('.music-progress-current');
    dom.time = player.querySelector('.music-time');
    dom.muteBtn = player.querySelector('.music-mute');
    dom.volumeSlider = player.querySelector('.music-volume');
    dom.listBtn = player.querySelector('.music-list-btn');
    dom.playlist = player.querySelector('.music-playlist');
    dom.playlistItems = player.querySelector('.music-playlist-items');

    // Bind events
    dom.playBtn.addEventListener('click', togglePlay);
    dom.prevBtn.addEventListener('click', prev);
    dom.nextBtn.addEventListener('click', next);
    dom.progressWrap.addEventListener('click', seek);
    dom.muteBtn.addEventListener('click', toggleMute);
    dom.volumeSlider.addEventListener('input', function () {
      setVolume(parseInt(this.value));
    });
    dom.listBtn.addEventListener('click', togglePlaylist);

    // Close playlist when clicking outside the player
    document.addEventListener('click', function (e) {
      if (playlistVisible && !player.contains(e.target)) {
        closePlaylist();
      }
    });

    // Audio events
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', next);

    // Save state before page unload (for cross-page continuity)
    window.addEventListener('beforeunload', saveState);

    // Set default volume
    setVolume(80);

    // Load playlist then restore state
    loadPlaylist().then(function () {
      if (playlist.length > 0) {
        restoreState();
      }
    });

    // Bind pjax for seamless navigation
    bindPjaxLinks();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
