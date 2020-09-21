import { createElement, FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MainImage } from './MainImage';

type NoScriptImageProps<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
> = {
  as?: C;
};

export const NullComponent: FunctionComponent<{}> = function NullComponent() {
  return null;
};

export const NoScriptImage: FunctionComponent<NoScriptImageProps<
  any
>> = function NoScriptImage({ as = MainImage, ...props }) {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: renderToStaticMarkup(createElement(as, props)),
      }}
    />
  );
};
