import justifiedLayout from "./justified-layout/index.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  let containerWidth = 0;
  const items = gallery.querySelectorAll(".gallery-item");

  const input = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    img.style.width = "100%";
    img.style.height = "auto";
    return {
      width: parseFloat(img.getAttribute("width")),
      height: parseFloat(img.getAttribute("height")),
    };
  });

  function updateGallery() {
    if (containerWidth === gallery.getBoundingClientRect().width) return;
    containerWidth = gallery.getBoundingClientRect().width;

    const geometry = justifiedLayout(input, {
      containerWidth,
      containerPadding: 0,
      boxSpacing: Number.isInteger(params.boxSpacing) ? params.boxSpacing : 8,
      targetRowHeight: params.targetRowHeight || 288,
      targetRowHeightTolerance: Number.isInteger(params.targetRowHeightTolerance) ? params.targetRowHeightTolerance : 0.25,
    });

    items.forEach((item, i) => {
      const { width, height, top, left } = geometry.boxes[i];
      item.style.position = "absolute";
      item.style.width = width + "px";
      item.style.height = height + "px";
      item.style.top = top + "px";
      item.style.left = left + "px";
      item.style.overflow = "hidden";
    });

    gallery.style.position = "relative";
    gallery.style.height = geometry.containerHeight + "px";
    gallery.style.visibility = "";
  }

  window.addEventListener("resize", updateGallery);
  window.addEventListener("orientationchange", updateGallery);

  updateGallery();
  updateGallery();
}
