import {
  createElement,
  ElementType,
  Fragment,
  useEffect,
  useRef,
  FunctionComponent,
  CSSProperties,
  ImgHTMLAttributes,
} from 'react';
import { hydrate, render, Renderer } from 'react-dom';
import {
  getWrapperProps,
  getMainProps,
  getPlaceHolderProps,
  useImageLoaded,
  hasNativeLazyLoadSupport,
} from './hooks';
import { PlaceholderProps, Placeholder } from './Placeholder';
import { MainImageProps, MainImage } from './MainImage';

export type GatsbyImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'placeholder'
> & {
  alt: string;
  as?: ElementType;
  aspectRatio?: number;
  className?: string;
  height?: number;
  images: Pick<MainImageProps, 'sources' | 'fallback'>;
  maxWidth?: number;
  maxHeight?: number;
  placeholder: Pick<PlaceholderProps, 'sources' | 'fallback'>;
  width?: number;
};

function hybridRender(
  render: Renderer,
  children: any,
  root: Element | DocumentFragment
) {
  render(
    <Fragment>
      {children}
      <script
        dangerouslySetInnerHTML={{ __html: '' }}
        suppressHydrationWarning
      />
    </Fragment>,
    root
  );
}

const GatsbyImageForRealz: FunctionComponent<GatsbyImageProps> = function GatsbyImageForRealz({
  placeholder,
  images,
  loading,
  aspectRatio,
  ...props
}) {
  const cacheKey = JSON.stringify(images);
  const ref = useRef();
  const { isLoading, isLoaded, toggleLoaded } = useImageLoaded(
    cacheKey,
    loading,
    ref
  );

  return (
    <Fragment>
      <Placeholder {...getPlaceHolderProps(placeholder)} />
      <MainImage
        {...(props as Omit<MainImageProps, 'images' | 'fallback'>)}
        {...getMainProps(
          isLoading,
          isLoaded,
          images,
          loading,
          aspectRatio,
          toggleLoaded,
          cacheKey,
          ref
        )}
      />
      <noscript
        dangerouslySetInnerHTML={{ __html: '' }}
        suppressHydrationWarning
      />
    </Fragment>
  );
};

export const GatsbyImageHydrator: FunctionComponent<{
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
}> = function GatsbyImageHydrator({ as: Type = 'div', children, ...props }) {
  const root = useRef<HTMLElement>();
  const hydrated = useRef(false);
  const io = useRef(null);

  useEffect(() => {
    const doRender = hydrated.current ? render : hydrate;

    if (root.current) {
      if (
        hasNativeLazyLoadSupport ||
        !(`IntersectionObserver` in window) ||
        hydrated.current
      ) {
        hybridRender(doRender, children, root.current);
      } else {
        io.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                hybridRender(doRender, children, entry.target);
              }
            });
          },
          {
            rootMargin: '100%',
          }
        );
        io.current.observe(root.current);
      }

      hydrated.current = true;
    }

    return () => {
      if (root.current) {
        if (io.current) {
          io.current.unobserve(root.current);
        }
        hybridRender(render, null, root.current);
      }
    };
  }, [children]);

  return (
    <Type
      {...props}
      ref={root}
      dangerouslySetInnerHTML={{ __html: '' }}
      suppressHydrationWarning
    />
  );
};

export const GatsbyImage: FunctionComponent<GatsbyImageProps> = function GatsbyImage({
  as,
  className,
  style,
  width,
  height,
  maxWidth,
  maxHeight,
  aspectRatio,
  loading = 'lazy',
  ...props
}) {
  const wrapperProps = getWrapperProps(
    width,
    height,
    aspectRatio,
    maxWidth,
    maxHeight
  );

  return (
    <GatsbyImageHydrator
      {...wrapperProps}
      as={as}
      style={{
        ...style,
        ...wrapperProps.style,
      }}
      className={className}
    >
      <GatsbyImageForRealz
        loading={loading}
        aspectRatio={aspectRatio}
        {...props}
      />
    </GatsbyImageHydrator>
  );
};
