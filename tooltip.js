document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.profile-icon-btn[title]').forEach(function (el) {
    var t = el.getAttribute('title');
    if (t) {
      el.setAttribute('data-tooltip', t);
      el.removeAttribute('title');
    }
  });

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        var list = node.matches && node.matches('.profile-icon-btn[title]') ? [node] : [];
        if (node.querySelectorAll) list = list.concat(Array.prototype.slice.call(node.querySelectorAll('.profile-icon-btn[title]')));
        list.forEach(function (el) {
          var t = el.getAttribute('title');
          if (t) {
            el.setAttribute('data-tooltip', t);
            el.removeAttribute('title');
          }
        });
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
