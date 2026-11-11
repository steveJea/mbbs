/* 점검 시간 표시. 시각을 고치려면 maintenance-config.js 만 수정합니다. */
(function () {
  var WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  function parseKst(raw) {
    if (raw == null) return null;
    var s = String(raw).trim();
    // +09:00 의 + 가 쿼리에서 공백이 된 경우도 한국 시간으로 읽습니다.
    s = s.replace(/(?:Z|[+-]\d{2}:?\d{2}|\s+\d{2}:?\d{2})$/i, '');
    s = s.replace(/^(\d{4}-\d{2}-\d{2})[tT\s]/, '$1T');
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(s);
    if (!m) return null;
    var year = +m[1], month = +m[2], day = +m[3], hour = +m[4], minute = +m[5], second = +(m[6] || 0);
    if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) return null;
    var iso = m[1] + '-' + m[2] + '-' + m[3] + 'T' + m[4] + ':' + m[5] + ':' + String(second).padStart(2, '0') + '+09:00';
    var date = new Date(iso);
    if (isNaN(date.getTime())) return null;
    var wall = seoulWall(date);
    if (wall.year !== year || wall.month !== month || wall.day !== day || wall.hour !== hour || wall.minute !== minute) return null;
    return date;
  }

  function seoulWall(date) {
    var shifted = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
      hour: shifted.getUTCHours(),
      minute: shifted.getUTCMinutes(),
      weekday: shifted.getUTCDay()
    };
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function dayStamp(w) {
    return Date.UTC(w.year, w.month - 1, w.day);
  }

  function formatWindow(start, end) {
    var a = seoulWall(start);
    var b = seoulWall(end);
    var head = a.year + '-' + pad(a.month) + '-' + pad(a.day) + '(' + WEEK[a.weekday] + ') ' + pad(a.hour) + ':' + pad(a.minute);
    var nextMidnight = b.hour === 0 && b.minute === 0 && (dayStamp(b) - dayStamp(a)) === 86400000;
    if (nextMidnight) return head + ' ~ 24:00 (KST)';
    var endClock = pad(b.hour) + ':' + pad(b.minute);
    if (a.year === b.year && a.month === b.month && a.day === b.day) return head + ' ~ ' + endClock + ' (KST)';
    var endHead = b.year + '-' + pad(b.month) + '-' + pad(b.day) + '(' + WEEK[b.weekday] + ') ' + endClock;
    return head + ' ~ ' + endHead + ' (KST)';
  }

  function onMaintenancePage() {
    return /\/maintenance(?:\.html)?\/?$/.test(location.pathname);
  }

  function resolve(pathname, search) {
    var cfg = window.MAINT || {};
    var start = parseKst(cfg.start);
    var end = parseKst(cfg.end);
    var overridden = false;
    if (onMaintenancePage() || /\/maintenance(?:\.html)?\/?$/.test(pathname || '')) {
      var q = new URLSearchParams(search || '');
      if (q.has('start')) {
        var nextStart = parseKst(q.get('start'));
        if (nextStart) { start = nextStart; overridden = true; }
      }
      if (q.has('end')) {
        var nextEnd = parseKst(q.get('end'));
        if (nextEnd) { end = nextEnd; overridden = true; }
      }
    }
    return { start: start, end: end, overridden: overridden, note: cfg.note || '' };
  }

  function remainText(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var days = Math.floor(total / 86400);
    var hours = Math.floor((total % 86400) / 3600);
    var mins = Math.floor((total % 3600) / 60);
    var secs = total % 60;
    var parts = [];
    if (days) parts.push(days + '일');
    if (days || hours) parts.push(hours + '시간');
    if (days || hours || mins) parts.push(mins + '분');
    parts.push(secs + '초');
    return parts.join(' ');
  }

  function paintTimes(times) {
    var windowEl = document.getElementById('maintWindow');
    if (!windowEl) return;
    var hint = document.getElementById('maintHint');
    var noteEl = document.getElementById('maintNote');
    if (!times.start || !times.end) {
      windowEl.textContent = '시간을 읽지 못했습니다. maintenance-config.js의 start와 end를 확인해 주세요.';
      return;
    }
    windowEl.textContent = formatWindow(times.start, times.end);
    if (hint) {
      hint.hidden = !times.overridden;
      hint.textContent = times.overridden ? '주소에 적힌 시간입니다. 한국 시간(KST)으로 해석했습니다.' : '';
    }
    if (noteEl) {
      var note = String(times.note || '').trim();
      noteEl.hidden = !note;
      noteEl.textContent = note;
    }
  }

  function bootCountdown(times) {
    var live = document.getElementById('maintLive');
    if (!live || !times.start || !times.end) return;
    var cap = document.getElementById('maintCap');
    var left = document.getElementById('maintLeft');
    var soon = document.getElementById('maintSoon');
    function render() {
      if (Date.now() >= times.end.getTime()) {
        if (cap) cap.hidden = true;
        if (left) left.hidden = true;
        if (soon) soon.hidden = false;
        return true;
      }
      if (cap) cap.hidden = false;
      if (left) {
        left.hidden = false;
        left.textContent = remainText(times.end.getTime() - Date.now());
      }
      if (soon) soon.hidden = true;
      return false;
    }
    if (!render()) {
      var timer = setInterval(function () {
        if (render()) clearInterval(timer);
      }, 1000);
    }
  }

  window.MBBSMaint = { parseKst: parseKst, formatWindow: formatWindow, resolve: resolve, remainText: remainText };

  function boot() {
    if (!document.getElementById('maintWindow')) return;
    var times = resolve(location.pathname, location.search);
    paintTimes(times);
    bootCountdown(times);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
