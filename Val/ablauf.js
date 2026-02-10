// -------- Accordion ausklappen --------
const accordionHeaders = document.querySelectorAll(".acc-header");

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const expanded = header.getAttribute("aria-expanded") === "true";
    const contentId = header.getAttribute("aria-controls");
    const content = document.getElementById(contentId);

    header.setAttribute("aria-expanded", String(!expanded));
    content.classList.toggle("open", !expanded);
    content.setAttribute("aria-hidden", String(expanded));
  });
});
