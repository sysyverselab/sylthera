(function() {
  function initBottin() {
    var app = document.querySelector(".bottin-app");
    if (!app) { return; }

    var rows = app.querySelectorAll(".bottin-table tbody tr");
    var tbody = app.querySelector(".bottin-table tbody");
Array.prototype.slice.call(rows).sort(function(a, b) {
  var aText = (a.querySelector(".bottin-col-faceclaim") || {}).textContent || "";
  var bText = (b.querySelector(".bottin-col-faceclaim") || {}).textContent || "";
  return aText.trim().localeCompare(bText.trim(), "fr", { sensitivity: "base" });
}).forEach(function(row) { tbody.appendChild(row); });
    var noResult = app.querySelector(".bottin-no-result");
    var active = { eveil: null, organisation: null };
    var searchTerm = "";

    function rowValue(row, colIndex) {
      var cell = row.children[colIndex];
      var icon = cell ? cell.querySelector(".iconsax") : null;
      return icon ? icon.getAttribute("icon-name") : null;
    }
    function rowText(row) { return row.textContent.toLowerCase(); }

    function applyFilters() {
      var anyVisible = false;
      rows.forEach(function(row) {
        var ok = true;
        if (active.eveil && rowValue(row, 0) !== active.eveil) { ok = false; }
        if (active.organisation && rowValue(row, 1) !== active.organisation) { ok = false; }
        if (ok && searchTerm && rowText(row).indexOf(searchTerm) === -1) { ok = false; }
        row.classList.toggle("is-hidden", !ok);
        if (ok) { anyVisible = true; }
      });
      if (noResult) { noResult.classList.toggle("is-visible", !anyVisible); }
    }

    app.querySelectorAll(".bottin-legend-group").forEach(function(group) {
      var col = group.getAttribute("data-col");
      group.querySelectorAll(".bottin-legend-item").forEach(function(item) {
        item.addEventListener("click", function() {
          var icon = item.querySelector(".iconsax");
          var value = icon ? icon.getAttribute("icon-name") : null;
          if (active[col] === value) {
            active[col] = null;
            item.classList.remove("active");
          } else {
            group.querySelectorAll(".bottin-legend-item").forEach(function(o){ o.classList.remove("active"); });
            active[col] = value;
            item.classList.add("active");
          }
          applyFilters();
        });
      });
    });

    var resetBtn = app.querySelector(".bottin-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function() {
        active = { eveil: null, organisation: null };
        searchTerm = "";
        var search = app.querySelector(".bottin-search");
        if (search) { search.value = ""; }
        app.querySelectorAll(".bottin-legend-item").forEach(function(o){ o.classList.remove("active"); });
        applyFilters();
      });
    }

    var searchInput = app.querySelector(".bottin-search");
    if (searchInput) {
      searchInput.addEventListener("input", function(e) {
        searchTerm = e.target.value.trim().toLowerCase();
        applyFilters();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBottin);
  } else {
    initBottin();
  }
})();
