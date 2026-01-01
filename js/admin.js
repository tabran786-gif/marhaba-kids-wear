alert("admin.js loaded");



document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("addBtn");

  if (!btn) {
    alert("Add button not found");
    return;
  }

  btn.addEventListener("click", function () {
    alert("Add Product button CLICKED");
  });
});
