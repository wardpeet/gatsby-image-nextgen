import { createElement, FunctionComponent } from 'react';
import { GatsbyImageProps } from './GatsbyImage.browser';
import { GatsbyImage as GatsbyImageOriginal } from './GatsbyImage.server';

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

const removeNewLines = (str: string): string => str.replace(/\n/g, '');

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
          srcSet: removeNewLines(fixed.srcSet),
        },
        sources: [],
      },
    };

    if (fixed.srcWebp) {
      rewiredProps.images.sources.push({
        // @ts-ignore
        src: fixed.srcWebp,
        srcSet: removeNewLines(fixed.srcSetWebp),
        type: 'image/webp',
      });
    }
  }

  if (fluid) {
    rewiredProps = {
      placeholder: {
        fallback: fluid.base64 || fluid.tracedSVG,
      },
      aspectRatio: fluid.aspectRatio,
      maxWidth: fluid.maxWidth,
      maxHeight: fluid.maxHeight,
      images: {
        fallback: {
          src: fluid.src,
          srcSet: removeNewLines(fluid.srcSet),
        },
        sources: [],
      },
    };

    if (fluid.srcWebp) {
      rewiredProps.images.sources.push({
        // @ts-ignore
        src: fluid.srcWebp,
        srcSet: removeNewLines(fluid.srcSetWebp),
        type: 'image/webp',
      });
    }
  }

  return <GatsbyImageOriginal {...(rewiredProps as GatsbyImageProps)} />;
};
