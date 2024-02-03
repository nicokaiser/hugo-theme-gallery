const el = document.getElementById("menu-toggle");
el.addEventListener("click", (event) => {
  event.preventDefault();
  const target = document.getElementById("menu");
  if (target.classList.contains("hidden")) {
    target.classList.remove("hidden");
    el.ariaExpanded = true;
  } else {
    target.classList.add("hidden");
    el.ariaExpanded = false;
  }
});
