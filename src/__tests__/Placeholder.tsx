import { createElement } from 'react';
import { render } from '@testing-library/react';
import { Placeholder } from '../Placeholder';

describe('Placeholder component', () => {
  it('should render only a fallback image', () => {
    const { container } = render(
      <Placeholder fallback="https://placekitten.com/20/20" />
    );

    const sources = container.querySelectorAll('source');
    expect(sources.length).toBe(0);

    expect(container.querySelector('picture')).toBe(null);

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('aria-hidden');
    expect(image).toHaveAttribute('src', 'https://placekitten.com/20/20');
    expect(image).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    });
  });

  it('should enable custom styling', () => {
    const { container } = render(
      <Placeholder
        fallback="https://placekitten.com/20/20"
        style={{ backgroundColor: '#000', position: 'relative' }}
      />
    );

    const image = container.querySelector('img');
    expect(image).toHaveStyle({
      backgroundColor: '#000',
      position: 'absolute',
    });
  });

  it('should accept custom props', () => {
    const { container } = render(
      <Placeholder
        fallback="https://placekitten.com/20/20"
        // @ts-ignore
        src="https://placekitten.com/200/200"
        title="Cool image"
      />
    );

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://placekitten.com/20/20');
    expect(image).toHaveAttribute('title', 'Cool image');
  });

  it('does not except alt prop', () => {
    const { container } = render(
      // @ts-ignore
      <Placeholder alt="test" fallback="https://placekitten.com/20/20" />
    );

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', '');
  });

  it('enables art direction', () => {
    const images = [
      {
        srcSet: 'https://placekitten.com/800/500',
        media: '(min-width: 800px)',
      },
      {
        srcSet: 'https://placekitten.com/200/200?format=webp',
        type: 'image/webp',
      },
    ];
    const { container } = render(
      <Placeholder
        fallback="https://placekitten.com/200/200"
        sources={images}
      />
    );

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://placekitten.com/200/200');

    const sources = container.querySelectorAll('source');
    expect(sources.length).toBe(2);
    expect(sources[0]).toHaveAttribute('srcSet', images[0].srcSet);
    expect(sources[0]).toHaveAttribute('media', images[0].media);
    expect(sources[1]).toHaveAttribute('srcSet', images[1].srcSet);
    expect(sources[1]).not.toHaveAttribute('media');
    expect(sources[1]).toHaveAttribute('type', images[1].type);
  });
});
