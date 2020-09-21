import {
  createElement,
  ElementType,
  Fragment,
  useEffect,
  useRef,
  FunctionComponent,
  CSSProperties,
  ImgHTMLAttributes,
  useState,
} from 'react';
import { hydrate, render, Renderer } from 'react-dom';
import {
  getWrapperProps,
  getMainProps,
  getPlaceHolderProps,
  hasNativeLazyLoadSupport,
  hasImageLoaded,
  storeImageloaded,
} from './hooks';
import { LayoutWrapper, LayoutWrapperProps } from './LayoutWrapper';
import { PlaceholderProps, Placeholder } from './Placeholder';
import { MainImageProps, MainImage } from './MainImage';

export type GatsbyImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'placeholder'
> & {
  alt: string;
  as?: ElementType;
  layout: LayoutWrapperProps['layout'];
  className?: string;
  height?: number;
  images: Pick<MainImageProps, 'sources' | 'fallback'>;
  placeholder: Pick<PlaceholderProps, 'sources' | 'fallback'>;
  width?: number;
};

let showedWarning = false;

export const GatsbyImageHydrator: FunctionComponent<GatsbyImageProps> = function GatsbyImageHydrator({
  as: Type = 'div',
  style,
  className,
  layout = 'fixed',
  width,
  height,
  placeholder,
  images,
  loading,
  ...props
}) {
  const root = useRef<HTMLElement>();
  const hydrated = useRef(false);
  const io = useRef(null);
  const ref = useRef();
  const [isLoading, toggleIsLoading] = useState(hasNativeLazyLoadSupport);
  const [isLoaded, toggleIsLoaded] = useState(false);

  // @ts-ignore
  if (!global.GATSBY___IMAGE && !showedWarning) {
    showedWarning = true;
    console.warn(
      `[gatsby-image] You're missing out on some cool performance features. Please add "gatsby-image" to your gatsby-config.js`
    );
  }

  const { style: wStyle, className: wClass, ...wrapperProps } = getWrapperProps(
    width,
    height,
    layout
  );

  useEffect(() => {
    const doRender = hydrated.current ? render : hydrate;

    if (root.current) {
      const hasSSRHtml = root.current.querySelector('[data-gatsby-image-ssr]');
      // when SSR and native lazyload is supported we'll do nothing ;)
      // @ts-ignore
      if (hasNativeLazyLoadSupport && hasSSRHtml && global.GATSBY___IMAGE) {
        hasSSRHtml.addEventListener('load', function onLoad() {
          hasSSRHtml.removeEventListener('load', onLoad);

          storeImageloaded(JSON.stringify(images));
        });
        return;
      }

      const cacheKey = JSON.stringify(images);
      const hasLoaded = !hydrated.current && hasImageLoaded(cacheKey);

      const component = (
        <LayoutWrapper layout={layout} width={width} height={height}>
          {!hasLoaded && <Placeholder {...getPlaceHolderProps(placeholder)} />}
          <MainImage
            {...(props as Omit<MainImageProps, 'images' | 'fallback'>)}
            {...getMainProps(
              isLoading,
              hasLoaded || isLoaded,
              images,
              loading,
              () => {
                toggleIsLoaded(true);
              },
              cacheKey,
              ref
            )}
          />
        </LayoutWrapper>
      );

      doRender(component, root.current);
      hydrated.current = true;

      if (!(`IntersectionObserver` in window)) {
        toggleIsLoading(true);
        return;
      }

      io.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              toggleIsLoading(true);
            }
          });
        },
        {
          // TODO tweak
          rootMargin: '150%',
        }
      );
      io.current.observe(root.current);
    }

    return () => {
      if (root.current) {
        if (io.current) {
          io.current.unobserve(root.current);
        }

        render(null, root.current);
      }
    };
  }, [isLoading, isLoaded]);

  return (
    <Type
      {...wrapperProps}
      style={{
        ...wStyle,
        ...style,
      }}
      className={`${wClass}${className ? ` ${className}` : ''}`}
      ref={root}
      dangerouslySetInnerHTML={{ __html: '' }}
      suppressHydrationWarning
    />
  );
};

export const GatsbyImage: FunctionComponent<GatsbyImageProps> = function GatsbyImage(
  props
) {
  return <GatsbyImageHydrator {...props} />;
};
GatsbyImage.displayName = 'GatsbyImage';
