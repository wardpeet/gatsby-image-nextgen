import { useState, CSSProperties, useRef, useEffect } from 'react';
const imageCache = new Set<string>();

// Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/
export const hasNativeLazyLoadSupport =
  typeof HTMLImageElement !== `undefined` &&
  `loading` in HTMLImageElement.prototype;

export function getWrapperProps(
  width?: number,
  height?: number,
  aspectRatio?: number,
  maxWidth?: number,
  maxHeight?: number
) {
  const wrapperStyle: CSSProperties = {
    position: 'relative',
  };

  if (!!aspectRatio) {
    wrapperStyle.width = `100%`;
    wrapperStyle.maxWidth = maxWidth;
    wrapperStyle.maxHeight = maxHeight;
  } else {
    wrapperStyle.width = width;
    wrapperStyle.height = height;
  }

  return {
    style: wrapperStyle,
  };
}

export function getMainProps(
  isLoading: boolean,
  isLoaded: boolean,
  images: any,
  loading: 'eager' | 'lazy',
  aspectRatio?: number,
  toggleLoaded?: any,
  cacheKey?: string,
  ref?: any
): any {
  return {
    ...images,
    loading,
    shouldLoad: isLoading,
    aspectRatio,
    'data-main-image': '',
    style: {
      height: '100%',
      left: 0,
      opacity: isLoaded ? 1 : 0,
      position: 'absolute',
      top: 0,
      transform: 'translateZ(0)',
      transition: 'opacity 300ms',
      width: '100%',
      willChange: 'opacity',
    },
    onLoad: function (e: any) {
      imageCache.add(cacheKey);
      toggleLoaded(true);
    },
    ref,
  };
}

export function getPlaceHolderProps(placeholder: any) {
  return {
    ...placeholder,
    'aria-hidden': true,
    style: {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  };
}

export function useImageLoaded(
  cacheKey: string,
  loading: 'lazy' | 'eager',
  ref: any
) {
  const [isLoaded, toggleLoaded] = useState(false);
  const [isLoading, toggleIsLoading] = useState(loading === 'eager');

  const rAF =
    typeof window !== 'undefined' && 'requestAnimationFrame' in window
      ? requestAnimationFrame
      : function (cb: Function) {
          return setTimeout(cb, 16);
        };
  const cRAF =
    typeof window !== 'undefined' && 'cancelAnimationFrame' in window
      ? cancelAnimationFrame
      : clearTimeout;

  useEffect(() => {
    let interval: any;
    // @see https://stackoverflow.com/questions/44074747/componentdidmount-called-before-ref-callback/50019873#50019873
    function toggleIfRefExists() {
      if (ref.current) {
        if (loading === 'eager' && ref.current.complete) {
          imageCache.add(cacheKey);
          toggleLoaded(true);
        } else {
          toggleIsLoading(true);
        }
      } else {
        interval = rAF(toggleIfRefExists);
      }
    }
    toggleIfRefExists();

    return () => {
      cRAF(interval);
    };
  }, []);

  return {
    isLoading,
    isLoaded,
    toggleLoaded,
  };
}

export function useGatsbyImage({
  placeholder,
  images,
  width,
  height,
  aspectRatio,
  maxWidth,
  maxHeight,
  loading = 'lazy',
}: any): any {
  const cacheKey = JSON.stringify(images);
  const ref = useRef();
  const { isLoading, isLoaded, toggleLoaded } = useImageLoaded(
    cacheKey,
    loading,
    ref
  );

  return {
    getWrapperProps: () =>
      getWrapperProps(width, height, aspectRatio, maxWidth, maxHeight),
    getMainImageProps: () =>
      getMainProps(
        isLoading || hasNativeLazyLoadSupport,
        isLoaded,
        images,
        loading,
        aspectRatio,
        toggleLoaded,
        cacheKey,
        ref
      ),
    getPlaceholderProps: () => getPlaceHolderProps(placeholder),
  };
}
