document.addEventListener('DOMContentLoaded', function () {
  function convertOne(el) {
    var t = el.getAttribute('title');
    if (!t) return;
    el.removeAttribute('title');
    var tip = document.createElement('span');
    tip.className = 'profile-icon-tooltip';
    tip.textContent = t;
    el.appendChild(tip);
  }

  function convertAll(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches && root.matches('.profile-icon-btn[title]')) convertOne(root);
    if (root.querySelectorAll) root.querySelectorAll('.profile-icon-btn[title]').forEach(convertOne);
  }

  convertAll(document.body);

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) { convertAll(node); });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
