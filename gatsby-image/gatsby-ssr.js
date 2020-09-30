var React = require('react');
var commonTags = require('common-tags');

var generateHtml = function generateHtml(str) {
  return {
    // TODO switch to proper cssminification
    __html: commonTags.oneLine(str)
  };
};

function onRenderBody(_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;
  setHeadComponents([/*#__PURE__*/React.createElement("style", {
    key: "gatsby-image-style",
    dangerouslySetInnerHTML: generateHtml(".gatsby-image img{bottom:0;height:100%;left:0;position:absolute;right:0;top:0;width:100%}.gatsby-image [data-main-image]{opacity:0;transform:translateZ(0);transition:opacity .3s ease 0s;will-change:opacity}")
  }), /*#__PURE__*/React.createElement("noscript", {
    key: "gatsby-image-style-noscript",
    dangerouslySetInnerHTML: generateHtml('<style>' + ".gatsby-image [data-main-image]{opacity:1!important}" + "</style>")
  }), /*#__PURE__*/React.createElement("script", {
    key: "gatsby-image-style-noscript",
    type: "module",
    dangerouslySetInnerHTML: generateHtml("const e=\"undefined\"!=typeof HTMLImageElement&&\"loading\"in HTMLImageElement.prototype;e&&document.body.addEventListener(\"load\",(function e(t){void 0!==t.target.dataset.mainImage&&(void 0!==t.target.dataset.gatsbyImageSsr?t.target.style.opacity=1:document.body.removeEventListener(\"load\",e,!0))}),!0);")
  })]);
}

exports.onRenderBody = onRenderBody;
