import {
  createElement,
  ElementType,
  FunctionComponent,
  CSSProperties,
} from 'react';
import { getWrapperProps, getMainProps, getPlaceHolderProps } from './hooks';
import { Placeholder } from './Placeholder';
import { MainImage, MainImageProps } from './MainImage';
import { NoScriptImage } from './NoScriptImage';
import { GatsbyImageProps } from './GatsbyImage.browser';

// TODO minify
const nativeEagerLoadScript = `(function(){
  var hasNativeLazyLoadSupport = typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype;
  if (hasNativeLazyLoadSupport) {
    var imageWrapper = document.currentScript.parentNode;
    var mainImage = imageWrapper.querySelector('img[data-main-image]');
    if (mainImage.dataset.src) {
      mainImage.setAttribute('src', mainImage.dataset.src)
      mainImage.removeAttribute('data-src')
    }
    if (mainImage.dataset.srcset) {
      mainImage.setAttribute('srcset', mainImage.dataset.srcset)
      mainImage.removeAttribute('data-srcset')
    }

    function showImage() {
      mainImage.style.opacity = 1;
      mainImage.removeEventListener('load', showImage);
    }

    if (mainImage.complete) {
      showImage();
    } else {
      mainImage.addEventListener('load', showImage);
    }
  }
})()`;

export const GatsbyImageHydrator: FunctionComponent<{
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
}> = function GatsbyImageHydrator({ as: Type = 'div', children, ...props }) {
  return (
    <Type {...props}>
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: nativeEagerLoadScript,
        }}
      />
    </Type>
  );
};

export const GatsbyImage: FunctionComponent<GatsbyImageProps> = function GatsbyImage({
  as,
  className,
  style,
  placeholder,
  images,
  width,
  height,
  maxWidth,
  maxHeight,
  aspectRatio,
  loading = 'lazy',
  ...props
}) {
  const wrapperProps = getWrapperProps(
    width,
    height,
    aspectRatio,
    maxWidth,
    maxHeight
  );

  return (
    <GatsbyImageHydrator
      {...wrapperProps}
      style={{
        ...style,
        ...wrapperProps.style,
      }}
      className={className}
      as={as}
    >
      <Placeholder {...getPlaceHolderProps(placeholder)} />
      <MainImage
        {...(props as Omit<MainImageProps, 'images' | 'fallback'>)}
        // When eager is set we want to start the isLoading state on true (we want to load the img without react)
        {...getMainProps(
          loading === 'eager',
          false,
          images,
          loading,
          aspectRatio
        )}
      />
      {/* TODO: move to css approach */}
      <NoScriptImage
        {...(props as Omit<MainImageProps, 'images' | 'fallback'>)}
        {...getMainProps(true, true, images, loading)}
      />
    </GatsbyImageHydrator>
  );
};
