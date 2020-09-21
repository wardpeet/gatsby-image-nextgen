import { createElement, FunctionComponent } from 'react';
import { GatsbyImageProps } from './GatsbyImage.browser';
import { GatsbyImage as GatsbyImageOriginal } from './GatsbyImage.browser';

type CompatProps = {
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
  ...props
}) {
  let rewiredProps: Partial<GatsbyImageProps> = { ...props };

  if (fixed) {
    rewiredProps = {
      placeholder: {
        fallback: fixed.base64 || fixed.tracedSVG,
      },
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
        // @ts-ignore
        src: fixed.srcWebp,
        srcSet: fixed.srcSetWebp,
      });
    }
  }

  if (fluid) {
    rewiredProps = {
      placeholder: {
        fallback: fluid.base64 || fluid.tracedSVG,
      },
      aspectRatio: fluid.aspectRatio,
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
        // @ts-ignore
        src: fluid.srcWebp,
        srcSet: fluid.srcSetWebp,
      });
    }
  }

  return <GatsbyImageOriginal {...(rewiredProps as GatsbyImageProps)} />;
};
