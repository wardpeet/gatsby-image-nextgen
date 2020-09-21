import { createElement, FunctionComponent } from 'react';
import { GatsbyImageProps } from './GatsbyImage.browser';
import { GatsbyImage as GatsbyImageOriginal } from './GatsbyImage.server';
import { CompatProps } from './compat.browser';

const removeNewLines = (str: string): string => str.replace(/\n/g, '');

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
          srcSet: removeNewLines(fixed.srcSet),
        },
        sources: [],
      },
    };

    if (fixed)
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

  return (
    <GatsbyImageOriginal {...props} {...(rewiredProps as GatsbyImageProps)} />
  );
};
