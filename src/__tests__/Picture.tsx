import { createElement } from 'react';
import { render } from '@testing-library/react';
import { Picture } from '../Picture';

describe('Picture component', () => {
  it('should render only a fallback image', () => {
    const fallback = {
      src: 'https://placekitten.com/200/200',
      srcSet: [
        'https://placekitten.com/350/350 1.5x',
        'https://placekitten.com/400/400 2x',
      ].join(', '),
    };
    const { container } = render(<Picture fallback={fallback} alt="my alt" />);

    const sources = container.querySelectorAll('source');
    expect(sources.length).toBe(0);

    expect(container.querySelector('picture')).toBe(null);

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', fallback.src);
    expect(image).toHaveAttribute('srcset', fallback.srcSet);
  });

  it('should accept custom props', () => {
    const fallback = {
      src: 'https://placekitten.com/200/200',
      srcSet: [
        'https://placekitten.com/350/350 1.5x',
        'https://placekitten.com/400/400 2x',
      ].join(', '),
    };
    const { container } = render(
      <Picture
        fallback={fallback}
        src="https://placekitten.com/200/200"
        title="Cool image"
        alt="cool image"
        style={{ backgroundColor: '#000', position: 'relative' }}
      />
    );

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://placekitten.com/200/200');
    expect(image).toHaveAttribute('title', 'Cool image');
    expect(image).toHaveAttribute('alt', 'cool image');
    expect(image).toHaveStyle({
      backgroundColor: '#000',
      position: 'relative',
    });
  });

  it('enables art direction', () => {
    const fallback = {
      src: 'https://placekitten.com/200/200',
      srcSet: [
        'https://placekitten.com/350/350 1.5x',
        'https://placekitten.com/400/400 2x',
      ].join(', '),
    };
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
      <Picture fallback={fallback} sources={images} alt="test" />
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
