/* mbbs.kr click tracker (same shared tracker).
   Markup it expects: .mg-card[data-id][data-cat] + a.plat, a.mg-tab[data-cat],
   a.feat / hero .btn to tcg.mbbs.kr, .more community links, footer hub links.
   Shared click tracker for violenceroyale.com, entincode.co.kr, mbbs.kr.
   Calls gtag only when window.gtag exists. Never prevents default or stops navigation.
   No personal data is collected. */
(function () {
  var HUB = {
    'violenceroyale.com': 'violenceroyale',
    'entincode.co.kr': 'entincode',
    'mbbs.kr': 'mbbs'
  };

  function sourceFromHost(host) {
    host = (host || '').replace(/^www\./, '');
    if (HUB[host]) return HUB[host];
    if (/(^|\.)violenceroyale\.pages\.dev$/.test(host)) return 'violenceroyale';
    if (/(^|\.)entincode\.pages\.dev$/.test(host)) return 'entincode';
    if (/(^|\.)mbbs(-dw1)?\.pages\.dev$/.test(host)) return 'mbbs';
    var attr = document.documentElement.getAttribute('data-track-source');
    if (attr) return attr;
    return 'violenceroyale';
  }

  var SOURCE = sourceFromHost(location.hostname);

  function send(name, params) {
    if (typeof window.gtag !== 'function') return;
    var p = {};
    if (params) for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) p[k] = params[k];
    p.transport_type = 'beacon';
    window.gtag('event', name, p);
  }

  function parseUrl(href, base) {
    try { return new URL(href, base || location.href); } catch (e) { return null; }
  }

  function bareHost(u) {
    return (u.hostname || '').replace(/^www\./, '').toLowerCase();
  }

  function hubName(host) {
    return HUB[host] || null;
  }

  function locFrom(el) {
    var marked = el.closest('[data-track-loc]');
    if (marked) {
      var v = marked.getAttribute('data-track-loc');
      if (v) return v;
    }
    if (el.closest('.feat') || el.closest('.flag') || el.closest('#flagship')) return 'flagship';
    var box = el.closest('section, header, footer, nav');
    if (!box) return 'page';
    var id = (box.id || '').toLowerCase();
    var cls = (typeof box.className === 'string' ? box.className : '').toLowerCase();
    if (/\bhero\b/.test(cls) || id === 'home' || id === 'top') return 'hero';
    if (id === 'flagship' || /\bflag\b/.test(cls)) return 'flagship';
    if (box.tagName === 'HEADER' || box.tagName === 'NAV' || /\bnav\b/.test(cls) || id === 'nav' || id === 'menu') return 'nav';
    if (box.tagName === 'FOOTER' || /\bft\b/.test(cls) || /\bfoot\b/.test(cls)) return 'footer';
    if (id) return id;
    return 'page';
  }

  function platformOf(a, url) {
    var cls = a.className || '';
    if (/\bp-telegram\b/.test(cls) || /\bp-toss\b/.test(cls) || /\bp-web\b/.test(cls)) {
      if (/\bp-telegram\b/.test(cls)) return 'telegram';
      if (/\bp-toss\b/.test(cls)) return 'toss';
      return 'web';
    }
    var host = url ? bareHost(url) : '';
    var href = (a.getAttribute('href') || (url && url.href) || '');
    if (host === 't.me' || /(?:^|\/\/)t\.me\//i.test(href) || /telegram/i.test(href)) return 'telegram';
    if (/toss/i.test(host) || /toss/i.test(href)) return 'toss';
    return 'web';
  }

  function isTab(a) {
    if (a.getAttribute('role') !== 'tab') return false;
    return !!(a.closest('.mgtabs, .mg-tabs') || a.classList.contains('mg-tab'));
  }

  function isPlayLink(a) {
    return a.classList.contains('mgb') || a.classList.contains('plat') ||
      /\bp-telegram\b|\bp-web\b|\bp-toss\b/.test(a.className || '');
  }

  function fireTab(a) {
    send('minigame_tab', { genre: a.getAttribute('data-cat') || '' });
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (href == null) return;

    if (isTab(a)) {
      fireTab(a);
      return;
    }

    var card = a.closest('.mgc, .mg-card');
    if (card && isPlayLink(a)) {
      var url = parseUrl(href);
      var nameEl = card.querySelector('h3, h4');
      send('minigame_click', {
        game_id: card.getAttribute('data-id') || '',
        game_name: nameEl ? nameEl.textContent.replace(/\s+/g, ' ').trim() : '',
        platform: platformOf(a, url),
        genre: card.getAttribute('data-cat') || ''
      });
      return;
    }

    var url = parseUrl(href);
    if (!url) return;
    var host = bareHost(url);

    if (host === 'tcg.mbbs.kr') {
      send('play_flagship', { location: locFrom(a) });
      return;
    }

    if (host === 'cafe.naver.com') {
      send('community_click', { channel: 'naver_cafe' });
      return;
    }
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com' || host === 'www.youtube.com') {
      send('community_click', { channel: 'youtube' });
      return;
    }
    // youtube.com already covered if www stripped... www.youtube.com → youtube.com after bareHost. Good.

    var dest = hubName(host);
    if (dest && dest !== SOURCE) {
      send('hub_click', { destination: dest });
      return;
    }

    if (SOURCE === 'entincode') {
      if (url.protocol === 'mailto:' || a.closest('#contact')) {
        send('contact_click', { location: locFrom(a) });
        return;
      }
      if (a.classList.contains('nav-cta') || a.classList.contains('btn') || a.classList.contains('link-arrow')) {
        send('cta_click', { location: locFrom(a) });
      }
    }
  }, false);

  document.addEventListener('keydown', function (ev) {
    var k = ev.key;
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : ev.target;
    if (!a || !isTab(a)) return;
    // Enter also fires click; skip here to avoid a double event.
    if (k === 'Enter') return;
    if (k === ' ' || k === 'Spacebar') { fireTab(a); return; }
    var list = a.closest('[role=tablist]');
    var tabs = list ? [].slice.call(list.querySelectorAll('[role=tab]')) : [];
    var i = tabs.indexOf(a), j = -1;
    if (k === 'ArrowRight' || k === 'Right' || k === 'ArrowDown' || k === 'Down') j = (i + 1) % tabs.length;
    else if (k === 'ArrowLeft' || k === 'Left' || k === 'ArrowUp' || k === 'Up') j = (i - 1 + tabs.length) % tabs.length;
    else if (k === 'Home') j = 0;
    else if (k === 'End') j = tabs.length - 1;
    if (j >= 0 && tabs[j]) fireTab(tabs[j]);
  }, false);

  function addUtm(a) {
    var raw = a.getAttribute('href');
    if (!raw || raw.charAt(0) === '#' || /^mailto:/i.test(raw) || /^javascript:/i.test(raw)) return;
    var url = parseUrl(raw);
    if (!url || url.protocol !== 'http:' && url.protocol !== 'https:') return;
    var host = bareHost(url);
    var dest = hubName(host);
    if (!dest || dest === SOURCE) return;
    if (url.searchParams.has('utm_source')) return;
    url.searchParams.set('utm_source', SOURCE);
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', 'crosslink');
    var next = url.href;
    // keep scheme-less or host-less originals looking stable when possible
    if (/^https?:\/\//i.test(raw)) a.setAttribute('href', next);
    else a.setAttribute('href', url.pathname + url.search + url.hash);
  }

  function enhance() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) addUtm(links[i]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();
