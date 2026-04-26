/*
 * Spearhead inline edit mode
 * ---------------------------
 * Activate by visiting any page with ?edit=1 (e.g. /about.html?edit=1).
 * Enter the password, then click any heading, paragraph, or list item to edit
 * inline. Hit "Save" in the floating toolbar and your proposed copy is emailed
 * to the team via Formspree. Nothing ships to the live site automatically.
 *
 * To change the password, edit EDIT_PASSWORD below and redeploy.
 */
(function () {
  'use strict';

  var EDIT_PASSWORD = 'spearhead-edit';
  var FORMSPREE_URL = 'https://formspree.io/f/xojpzrbr';
  var STORAGE_KEY = 'spearheadEditMode';
  var DRAFTS_KEY = 'spearheadEditDrafts';

  // Activation: ?edit=1 prompts for password, then sets a localStorage flag
  // that persists across navigation until "Exit" is pressed.
  var params = new URLSearchParams(window.location.search);
  if (params.get('edit') === '1') {
    var entered = window.prompt('Spearhead edit mode\n\nEnter the password to enable inline copy editing:');
    if (entered === EDIT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'on');
    } else if (entered !== null) {
      window.alert('Incorrect password.');
    }
    var url = new URL(window.location.href);
    url.searchParams.delete('edit');
    window.history.replaceState({}, '', url.toString());
  }

  if (localStorage.getItem(STORAGE_KEY) !== 'on') return;

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectStyles();
    var editables = collectEditables();
    var originals = new Map(); // element -> originalHTML
    var ids = new Map(); // element -> stable id

    editables.forEach(function (el, idx) {
      originals.set(el, el.innerHTML);
      ids.set(el, idx);
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'true');
      el.classList.add('inline-editable');
      // Prevent Enter from creating <div>/<br> chaos in inline elements
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !el.matches('p, li, blockquote, td, th, dd, .about-team-bio, .bio-modal-text')) {
          e.preventDefault();
        }
      });
      el.addEventListener('input', updateBadge);
      el.addEventListener('paste', function (e) {
        // Paste as plain text to avoid HTML pollution
        e.preventDefault();
        var text = (e.clipboardData || window.clipboardData).getData('text');
        document.execCommand('insertText', false, text);
      });
    });

    var toolbar = renderToolbar();
    document.body.appendChild(toolbar);
    updateBadge();

    function collectChanges() {
      var changes = [];
      originals.forEach(function (originalHTML, el) {
        var current = el.innerHTML;
        if (current !== originalHTML) {
          changes.push({
            id: ids.get(el),
            tag: el.tagName.toLowerCase(),
            path: getCssPath(el),
            context: getContext(el),
            originalHTML: originalHTML,
            originalText: htmlToText(originalHTML),
            proposedHTML: current,
            proposedText: htmlToText(current),
          });
        }
      });
      return changes;
    }

    function updateBadge() {
      var n = collectChanges().length;
      var btn = document.getElementById('inline-edit-save');
      var pillCount = document.getElementById('inline-edit-count');
      if (btn) {
        btn.disabled = n === 0;
        btn.textContent = n === 0 ? 'No changes yet' : 'Save & email ' + n + ' edit' + (n === 1 ? '' : 's');
      }
      if (pillCount) pillCount.textContent = n;
    }

    function renderToolbar() {
      var bar = document.createElement('div');
      bar.id = 'inline-edit-toolbar';
      bar.innerHTML =
        '<div class="ie-pill"><span class="ie-dot"></span> Edit mode <span id="inline-edit-count" class="ie-count">0</span></div>' +
        '<button id="inline-edit-save" type="button" class="ie-btn ie-btn-primary" disabled>No changes yet</button>' +
        '<button id="inline-edit-revert" type="button" class="ie-btn">Revert page</button>' +
        '<button id="inline-edit-exit" type="button" class="ie-btn">Exit</button>';

      bar.querySelector('#inline-edit-save').addEventListener('click', save);
      bar.querySelector('#inline-edit-revert').addEventListener('click', function () {
        if (!window.confirm('Revert all unsaved edits on this page?')) return;
        originals.forEach(function (html, el) {
          el.innerHTML = html;
        });
        updateBadge();
      });
      bar.querySelector('#inline-edit-exit').addEventListener('click', function () {
        if (!window.confirm('Exit edit mode? Unsaved changes on this page will be lost.')) return;
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      });

      return bar;
    }

    function save() {
      var changes = collectChanges();
      if (!changes.length) return;
      var btn = document.getElementById('inline-edit-save');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      var payload = {
        _subject: 'Site copy suggestion — ' + document.title,
        page: window.location.href,
        page_title: document.title,
        editor_user_agent: navigator.userAgent,
        edit_count: changes.length,
        edits_human_readable: formatHumanReadable(changes),
        edits_json: JSON.stringify(changes, null, 2),
      };

      fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          if (!r.ok) throw new Error('Formspree responded ' + r.status);
          return r.json().catch(function () { return {}; });
        })
        .then(function () {
          // Lock in the new "originals" so further edits diff against current state
          editables.forEach(function (el) {
            originals.set(el, el.innerHTML);
          });
          showToast('✓ Sent! ' + changes.length + ' edit' + (changes.length === 1 ? '' : 's') + ' emailed.');
          updateBadge();
        })
        .catch(function (err) {
          console.error('Inline edit save failed:', err);
          showToast('✗ Could not send. Check your connection and try again.', true);
          btn.disabled = false;
          updateBadge();
        });
    }
  }

  function collectEditables() {
    // Editable: text-bearing elements that are visible, not in nav/footer chrome,
    // and don't contain other editables (we want leaf-ish containers).
    var selector = [
      'h1','h2','h3','h4','h5','h6',
      'p','li','blockquote','figcaption','dt','dd','td','th',
      '.about-team-name','.about-team-title','.about-team-group-label',
      '.member-name','.member-role','.value-pill-title','.value-pill-desc',
      '.about-section-sub','.about-hero-subtitle',
      'span.text-red','span.text-black'
    ].join(',');

    // Skip these zones — chrome / nav / form fields / dynamic JS regions
    var skipSelector = [
      'nav','header.navbar','.navbar',
      'footer','.footer',
      'script','style','code','pre','svg',
      'button','input','textarea','select','option','label',
      '.bio-modal','.bio-modal-overlay',
      '[contenteditable="false"]'
    ].join(',');

    var all = Array.from(document.querySelectorAll(selector));
    return all.filter(function (el) {
      if (el.closest(skipSelector)) return false;
      if (!el.textContent || !el.textContent.trim()) return false;
      // Skip elements with no visible box
      var rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && el.offsetParent === null) return false;
      // Skip if a parent in our list already covers it (avoid nested editing)
      var parent = el.parentElement;
      while (parent && parent !== document.body) {
        if (all.indexOf(parent) !== -1) return false;
        parent = parent.parentElement;
      }
      return true;
    });
  }

  function getCssPath(el) {
    if (!el || el.nodeType !== 1) return '';
    var parts = [];
    var current = el;
    while (current && current.nodeType === 1 && current !== document.body && parts.length < 8) {
      var part = current.tagName.toLowerCase();
      if (current.id) {
        parts.unshift('#' + current.id);
        break;
      }
      if (current.className && typeof current.className === 'string') {
        var cls = current.className.split(/\s+/)
          .filter(function (c) { return c && !c.startsWith('inline-'); })
          .slice(0, 2)
          .join('.');
        if (cls) part += '.' + cls;
      }
      var siblings = current.parentNode ? Array.from(current.parentNode.children).filter(function (c) {
        return c.tagName === current.tagName;
      }) : [];
      if (siblings.length > 1) {
        var idx = siblings.indexOf(current);
        part += ':nth-of-type(' + (idx + 1) + ')';
      }
      parts.unshift(part);
      current = current.parentElement;
    }
    return parts.join(' > ');
  }

  function getContext(el) {
    // Nearest preceding heading helps locate the change in the email
    var heading = null;
    var node = el.previousElementSibling || el.parentElement;
    while (node && !heading) {
      if (/^H[1-6]$/.test(node.tagName)) {
        heading = node.textContent.trim().slice(0, 100);
        break;
      }
      var found = node.querySelector ? node.querySelector('h1,h2,h3,h4,h5,h6') : null;
      if (found) {
        heading = found.textContent.trim().slice(0, 100);
        break;
      }
      node = node.previousElementSibling || (node.parentElement === document.body ? null : node.parentElement);
    }
    return heading || '(no nearby heading)';
  }

  function htmlToText(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent.replace(/\s+/g, ' ').trim();
  }

  function formatHumanReadable(changes) {
    return changes.map(function (c, i) {
      return [
        '── Edit ' + (i + 1) + ' ──',
        'Element: <' + c.tag + '>',
        'Section: ' + c.context,
        'Path:    ' + c.path,
        '',
        'BEFORE: ' + c.originalText,
        'AFTER:  ' + c.proposedText,
      ].join('\n');
    }).join('\n\n');
  }

  function showToast(msg, isError) {
    var t = document.createElement('div');
    t.className = 'inline-edit-toast' + (isError ? ' inline-edit-toast-error' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 10);
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 300);
    }, isError ? 5000 : 3000);
  }

  function injectStyles() {
    if (document.getElementById('inline-edit-styles')) return;
    var s = document.createElement('style');
    s.id = 'inline-edit-styles';
    s.textContent = [
      '.inline-editable { outline: 2px dashed transparent; outline-offset: 4px; transition: outline-color 0.15s, background 0.15s; cursor: text; border-radius: 2px; }',
      '.inline-editable:hover { outline-color: rgba(240, 78, 54, 0.45); background: rgba(240, 78, 54, 0.04); }',
      '.inline-editable:focus { outline-color: #F04E36; outline-style: solid; background: rgba(240, 78, 54, 0.06); }',
      '#inline-edit-toolbar { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 99999; display: flex; align-items: center; gap: 8px; background: #1c1c1c; padding: 10px 12px; border-radius: 999px; box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Poppins, sans-serif; font-size: 13px; }',
      '#inline-edit-toolbar .ie-pill { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; color: #fff; font-weight: 600; }',
      '#inline-edit-toolbar .ie-dot { width: 8px; height: 8px; border-radius: 50%; background: #F04E36; box-shadow: 0 0 0 0 rgba(240,78,54,0.7); animation: ie-pulse 1.6s infinite; }',
      '@keyframes ie-pulse { 0% { box-shadow: 0 0 0 0 rgba(240,78,54,0.6); } 70% { box-shadow: 0 0 0 8px rgba(240,78,54,0); } 100% { box-shadow: 0 0 0 0 rgba(240,78,54,0); } }',
      '#inline-edit-toolbar .ie-count { background: rgba(255,255,255,0.12); border-radius: 10px; padding: 2px 8px; font-size: 12px; min-width: 22px; text-align: center; }',
      '#inline-edit-toolbar .ie-btn { font: inherit; font-weight: 600; color: #fff; background: rgba(255,255,255,0.08); border: none; padding: 8px 14px; border-radius: 999px; cursor: pointer; transition: background 0.15s; }',
      '#inline-edit-toolbar .ie-btn:hover:not(:disabled) { background: rgba(255,255,255,0.16); }',
      '#inline-edit-toolbar .ie-btn:disabled { opacity: 0.5; cursor: not-allowed; }',
      '#inline-edit-toolbar .ie-btn-primary { background: #F04E36; }',
      '#inline-edit-toolbar .ie-btn-primary:hover:not(:disabled) { background: #d9432e; }',
      '.inline-edit-toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%) translateY(20px); background: #1c1c1c; color: #fff; padding: 12px 20px; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Poppins, sans-serif; font-size: 14px; font-weight: 500; opacity: 0; transition: opacity 0.25s, transform 0.25s; z-index: 99999; }',
      '.inline-edit-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }',
      '.inline-edit-toast-error { background: #9c2a1a; }',
    ].join('\n');
    document.head.appendChild(s);
  }
})();
