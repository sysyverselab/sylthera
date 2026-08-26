document.addEventListener('DOMContentLoaded', function () {
  var ICONS = {
    'Fiche de présentation': 'personalcard',
    'Carnets': 'book',
    'Instagram': 'camera',
    'Moodboard': 'gallery'
  };

  function applyContactIcons() {
    var items = document.querySelectorAll('.contact-icon[data-label]');
    Array.prototype.forEach.call(items, function (el) {
      if (el.dataset.iconDone) return;
      el.dataset.iconDone = '1';
      var label = el.getAttribute('data-label');
      var iconName = ICONS[label];
      var link = el.querySelector('a');
      if (!iconName || !link) {
        el.style.display = 'none';
        return;
      }
      link.title = label;
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
