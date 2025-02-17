import PhotoSwipeLightbox from "./photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe/photoswipe.esm.js";
import PhotoSwipeDynamicCaption from "./photoswipe/photoswipe-dynamic-caption-plugin.esm.min.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 1,
    pswpModule: PhotoSwipe,
    imageClickAction: "close",
    closeTitle: params.closeTitle,
    zoomTitle: params.zoomTitle,
    arrowPrevTitle: params.arrowPrevTitle,
    arrowNextTitle: params.arrowNextTitle,
    errorMsg: params.errorMsg,
  });

  if (params.enableDownload) {
    lightbox.on("uiRegister", () => {
      lightbox.pswp.ui.registerElement({
        name: "download-button",
        order: 8,
        isButton: true,
        tagName: "a",
        html: {
          isCustomSVG: true,
          inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: "pswp__icn-download",
        },
        onInit: (el, pswp) => {
          el.setAttribute("download", "");
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
          el.setAttribute("title", params.downloadTitle || "Download");
          pswp.on("change", () => {
            el.href = pswp.currSlide.data.element.href;
          });
        },
      });
    });
  }

  lightbox.on("change", () => {
    const target = lightbox.pswp.currSlide?.data?.element?.dataset["pswpTarget"];
    history.replaceState("", document.title, "#" + target);
  });

  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });

  new PhotoSwipeDynamicCaption(lightbox, {
    mobileLayoutBreakpoint: 700,
    type: "auto",
    mobileCaptionOverlapRatio: 1,
  });

  lightbox.init();

  if (window.location.hash.substring(1).length > 1) {
    const target = window.location.hash.substring(1);
    const items = gallery.querySelectorAll("a");
    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset["pswpTarget"] === target) {
        lightbox.loadAndOpen(i, { gallery });
        break;
      }
    }
  }
}
