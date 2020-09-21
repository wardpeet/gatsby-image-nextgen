import { createElement, FunctionComponent } from 'react';
import { GatsbyImageProps } from './GatsbyImage.browser';
import { GatsbyImage as GatsbyImageOriginal } from './GatsbyImage.browser';

export type CompatProps = {
  backgroundColor?: string;
  Tag?: any;
  fixed?: {
    base64?: string;
    tracedSVG?: string;
    width: number;
    height: number;
    src: string;
    srcSet: string;
    srcWebp?: string;
    srcSetWebp?: string;
  };
  fluid?: {
    base64?: string;
    tracedSVG?: string;
    aspectRatio: number;
    src: string;
    srcSet: string;
    srcWebp?: string;
    srcSetWebp?: string;
    maxWidth?: number;
    maxHeight?: number;
  };
};

export const GatsbyImage: FunctionComponent<CompatProps> = function GatsbyImage({
  fixed,
  fluid,
  backgroundColor,
  Tag,
  ...props
}) {
  let rewiredProps: Partial<GatsbyImageProps> = { alt: '', as: Tag, ...props };

  if (backgroundColor) {
    rewiredProps.style = rewiredProps.style || {};
    rewiredProps.style.backgroundColor = backgroundColor;
  }

  if (fixed) {
    if (Array.isArray(fixed)) {
      fixed = fixed[0];
    }

    rewiredProps = {
      placeholder: {
        fallback: fixed.base64 || fixed.tracedSVG,
      },
      layout: 'fixed',
      width: fixed.width,
      height: fixed.height,
      images: {
        fallback: {
          src: fixed.src,
          srcSet: fixed.srcSet,
        },
        sources: [],
      },
    };

    if (fixed.srcWebp) {
      rewiredProps.images.sources.push({
        srcSet: fixed.srcSetWebp,
        type: 'image/webp',
      });
    }
  }

  if (fluid) {
    if (Array.isArray(fluid)) {
      fluid = fluid[0];
    }

    rewiredProps = {
      placeholder: {
        fallback: fluid.base64 || fluid.tracedSVG,
      },
      width: 1,
      height: fluid.aspectRatio,
      layout: 'responsive',
      images: {
        fallback: {
          src: fluid.src,
          srcSet: fluid.srcSet,
        },
        sources: [],
      },
    };

    if (fluid.srcWebp) {
      rewiredProps.images.sources.push({
        srcSet: fluid.srcSetWebp,
        type: 'image/webp',
      });
    }
  }

  return (
    <GatsbyImageOriginal
      alt=""
      {...props}
      {...(rewiredProps as GatsbyImageProps)}
    />
  );
};
