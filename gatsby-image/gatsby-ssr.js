import * as React from 'react';
import { oneLine } from 'common-tags';

const generateHtml = (str) => {
  return {
    // TODO switch to proper cssminification
    __html: str,
  };
};

export function onRenderBody({ setHeadComponents }, pluginOptions) {
  setHeadComponents([
    <style
      key="gatsby-image-style"
      dangerouslySetInnerHTML={generateHtml(`
  .gatsby-image img {
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
  .gatsby-image [data-main-image] {
    opacity: 0;
    transform: translateZ(0px);
    transition: opacity 300ms ease 0s;
    will-change: opacity;
  }
    `)}
    />,
    <noscript
      key="gatsby-image-style-noscript"
      dangerouslySetInnerHTML={generateHtml(`
<style>
  .gatsby-image [data-main-image] {
    opacity: 1 !important;
  }
</style>
    `)}
    />,
    <script
      key="gatsby-image-style-noscript"
      type="module"
      dangerouslySetInnerHTML={generateHtml(`
  const hasNativeLazyLoadSupport = typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype;
  if (hasNativeLazyLoadSupport) {
    document.body.addEventListener('load', function gatsbyImageNativeLoader(e) {
      //
      if (typeof e.target.dataset["mainImage"] === 'undefined') {
        return
      }

      if (typeof e.target.dataset["gatsbyImageSsr"] === 'undefined') {
        document.body.removeEventListener('load', gatsbyImageNativeLoader, true);
        return;
      }

      e.target.style.opacity = 1;
    }, true)
  }
    `)}
    />,
  ]);
}
