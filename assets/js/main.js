import fjGallery from "jslibs/flickr-justified-gallery/dist/fjGallery.esm.js";
import PhotoSwipeLightbox from "jslibs/photoswipe/dist/photoswipe-lightbox.esm.js";
import PhotoSwipe from "jslibs/photoswipe/dist/photoswipe.esm.js";
import PhotoSwipeDynamicCaption from "jslibs/photoswipe-dynamic-caption-plugin/dist/photoswipe-dynamic-caption-plugin.esm.min.js";
import Alpine from "jslibs/alpinejs/v3/alpinejs/dist/module.esm.js";
import collapse from "jslibs/alpinejs/v3/collapse/dist/module.esm.js";
import lazysizes from "jslibs/lazysizes/lazysizes.js";

Alpine.plugin(collapse);
Alpine.start();

const gallery = document.querySelector(".fj-gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".fj-gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 1,
    pswpModule: PhotoSwipe,
    imageClickAction: "close",
    paddingFn: (viewportSize) => {
      return viewportSize.x < 700
        ? {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }
        : {
            top: 30,
            bottom: 30,
            left: 0,
            right: 0,
          };
    },
  });

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
        el.setAttribute("title", "Download");
        pswp.on("change", () => {
          el.href = pswp.currSlide.data.element.href;
        });
      },
    });
  });

  lightbox.on("change", () => {
    history.replaceState("", document.title, "#" + lightbox.pswp.currSlide.index);
  });

  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });

  new PhotoSwipeDynamicCaption(lightbox, {
    mobileLayoutBreakpoint: 700,
    type: "auto",
    mobileCaptionOverlapRatio: 1,
  });

  fjGallery(gallery, {
    itemSelector: ".fj-gallery-item",
    onInit: () => {
      gallery.style.visibility = "";
      lightbox.init();
    },
    onJustify: () => {
      if (window.location.hash.substring(1).length > 0) {
        const index = parseInt(window.location.hash.substring(1), 10);
        if (!Number.isNaN(index) && index >= 0 && index < gallery.querySelectorAll("a").length) {
          lightbox.loadAndOpen(index, { gallery });
        }
      }
    },
    transitionDuration: false,
    calculateItemsHeight: true,
  });
}
