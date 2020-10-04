import { FunctionComponent } from 'react';
import { GatsbyImage as GatsbyImageOriginal } from './GatsbyImage.server';
import { CompatProps, _createCompatLayer } from './compat.browser';

export const GatsbyImage: FunctionComponent<CompatProps> = _createCompatLayer(
  GatsbyImageOriginal
);
