const toggle = document.querySelector("#menu-toggle");
const panel = document.querySelector("#mobile-menu");
const iconOpen = document.querySelector("#icon-open");
const iconClose = document.querySelector("#icon-close");

function setMenu(open) {
  if (!toggle || !panel) return;
  panel.classList.toggle("hidden", !open);
  iconOpen?.classList.toggle("hidden", open);
  iconClose?.classList.toggle("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
}

toggle?.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

// Close after choosing a link
panel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// Close with Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Reset when the desktop breakpoint (lg = 1024px) is reached
window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});
