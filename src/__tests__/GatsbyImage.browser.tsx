import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { GatsbyImage } from '../GatsbyImage.browser';

describe('GatsbyImage component browser', () => {
  const placeholderMock = {
    fallback:
      'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  };

  const sourcesMock = {
    fallback: {
      src: 'https://placekitten.com/200/200',
    },
  };

  it('should render placeholder and original element', () => {
    const placeholder = {
      fallback:
        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      sources: [
        {
          srcSet:
            'data:image/webp;base64,UklGRlQAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAIAAAAAf1ZQOCAsAAAAkAEAnQEqAQABAAIANCWgAnS6AAOYAP75k2//kB//kB//kB//ID/iF3sgMAA=',
          type: 'image/webp',
        },
      ],
    };

    const imageSources = {
      fallback: {
        src: 'https://placekitten.com/200/200',
        srcSet: [
          'https://placekitten.com/350/350 1.5x',
          'https://placekitten.com/400/400 2x',
        ].join(', '),
      },
      sources: [
        {
          srcSet: [
            'https://placekitten.com/350/350?format=webp 1.5x',
            'https://placekitten.com/400/400?format=webp 2x',
          ].join(', '),
          type: 'image/webp',
        },
      ],
    };

    const { container } = render(
      <GatsbyImage placeholder={placeholder} images={imageSources} alt="test" />
    );

    const placeholderImage = screen.getByAltText('');
    const placeholderSources = placeholderImage.parentElement.querySelectorAll(
      'source'
    );
    const mainImage = screen.getByAltText('test');
    const mainSources = mainImage.parentElement.querySelectorAll('source');

    expect(container.firstChild).toHaveStyle({
      position: 'relative',
    });
    expect(placeholderImage).toHaveAttribute('src', placeholder.fallback);
    expect(placeholderSources.length).toBe(1);
    expect(placeholderSources[0]).toHaveAttribute(
      'srcset',
      placeholder.sources[0].srcSet
    );
    expect(placeholderSources[0]).toHaveAttribute(
      'type',
      placeholder.sources[0].type
    );
    expect(mainImage).toHaveAttribute('src', imageSources.fallback.src);
    expect(mainImage).toHaveAttribute('srcset', imageSources.fallback.srcSet);
    expect(mainSources.length).toBe(1);
    expect(mainSources[0]).toHaveAttribute(
      'srcset',
      imageSources.sources[0].srcSet
    );
    expect(mainSources[0]).toHaveAttribute(
      'type',
      imageSources.sources[0].type
    );
  });

  it('should render a custom wrapper component', () => {
    const { container } = render(
      <GatsbyImage
        placeholder={placeholderMock}
        images={sourcesMock}
        as="section"
        alt="test"
      />
    );

    expect(container.firstChild.nodeName).toBe(`SECTION`);
  });
});
