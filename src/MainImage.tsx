import { createElement, forwardRef, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Picture, PictureProps } from './Picture';

export type MainImageProps = PictureProps & {
  aspectRatio?: number;
};

export const MainImage = forwardRef<HTMLImageElement, MainImageProps>(
  function MainImage({ aspectRatio, ...props }, ref) {
    return (
      <Fragment>
        <Picture ref={ref} {...props} />
        {aspectRatio > 0 && (
          <div style={{ paddingBottom: `${100 / aspectRatio}%` }}></div>
        )}
      </Fragment>
    );
  }
);

MainImage.propTypes = Picture.propTypes;
