document.addEventListener('DOMContentLoaded', function () {
  function matchIcon(key) {
    if (key.indexOf('sentation') !== -1) return 'personalcard';
    if (key.indexOf('carnet') !== -1) return 'book';
    if (key.indexOf('instagram') !== -1) return 'camera';
    if (key.indexOf('moodboard') !== -1) return 'gallery';
    if (key.indexOf('priv') !== -1) return 'send-2';
    return null;
  }

  function applyContactIcons() {
    var items = document.querySelectorAll('.contact-icon[data-label]');
    Array.prototype.forEach.call(items, function (el) {
      if (el.dataset.iconDone) return;
      el.dataset.iconDone = '1';
      var rawLabel = el.getAttribute('data-label') || '';
      var key = rawLabel.replace(/\s*:\s*$/, '').trim().toLowerCase();
      var iconName = matchIcon(key);
      var link = el.querySelector('a');
      if (!iconName || !link) {
        el.style.display = 'none';
        return;
      }
      link.title = rawLabel.replace(/\s*:\s*$/, '').trim();
      var icon = document.createElement('i');
      icon.className = 'iconsax';
      icon.setAttribute('icon-name', iconName);
      link.innerHTML = '';
      link.appendChild(icon);
    });
  }

  applyContactIcons();

  var pending = false;
  var observer = new MutationObserver(function () {
    if (pending) return;
    pending = true;
    setTimeout(function () {
      pending = false;
      applyContactIcons();
    }, 150);
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
