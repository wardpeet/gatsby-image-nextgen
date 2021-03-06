import { createElement, FunctionComponent, ImgHTMLAttributes } from 'react';
import * as PropTypes from 'prop-types';
import { Picture, SourceProps } from './Picture';

export type PlaceholderProps = ImgHTMLAttributes<{}> & {
  fallback: string;
  sources?: Array<SourceProps>;
};

export const Placeholder: FunctionComponent<PlaceholderProps> = function Placeholder({
  fallback,
  ...props
}) {
  return (
    <Picture
      {...props}
      fallback={{
        src: fallback,
      }}
      aria-hidden
      alt=""
    />
  );
};

Placeholder.displayName = 'Placeholder';
Placeholder.propTypes = {
  fallback: PropTypes.string.isRequired,
  sources: Picture.propTypes.sources,
  alt: function (props, propName, componentName) {
    if (props[propName]) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      );
    }
  },
};
