const el = document.getElementById("menu-toggle");
if (el) {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.getElementById("menu");
    el.ariaExpanded = target.classList.contains("hidden");
    target.classList.toggle("hidden");
  });
}
