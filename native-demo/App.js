import { createElement } from 'react';
import * as React from 'react';

const data = {
  fixedLong: {
    childImageSharp: {
      fixed: {
        base64: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAACPklEQVQ4y61Sy24aQRDcLzE2xrsLu172BWtjsB0pipTHJbkkx/xBLvmB3HLMX+SXEAY/kRBiwQLzNnala2Bt/DhmpKJmu7tqumfQNrdzSG2Z2EjpSGcshMUKvLCEoFhGGFWg+wfIBGVk3H3ohUPFGa8ksQrSToQNagWpdBb00lJpE9t2AUb0BptiaFo+snYAO1+E7UjcDpHzxUx4y8irb1PilrcPJyjByHlKk96xlammS8AQQ5Md5HzoWU+xwT0560KX4h1CDCleIpCDxVxANizWe9AYYJIG5qrA4LeAhrmwguDLd3gfvyIro/NAlVvVJEi02jLwaES28hEcGdPi6E4R/vEHhO8+wylU5CqYK8F299bMHo21xHkdOTGx3Qi+mISfvsE9eg9rtwBbHoh3xwOJ17RaxnTxBDJSsi///I23f/7i4Mcv6PKihrysvlvEttzlC90KWhgd4QX2lhyEB0sUyvI3OhTIfUaHD/nXoMVxFwrdFa+j21vD89wzrOIa/vPS7u/vMZlMMBgMMJvNsFgsMJ/PFU8mU9zc3Ciw5vZ2AdZPp1MMh8MHME8Nc6rDdruNRqOB09NT1Ot1XF1difhWxavVKmq1mspxPx6P0ZURWX92dqb45OQE19fXyw750+l0lODy8hLn5+fqRC4WUdzv9xV6vZ46KI5jZXZxcaHA/Wg0ejRkAbtqNpuKW62WGp9ijnF3d/eEKWaeK4lxPYxMQ7bOTjkSO2SScY7La2AX5OTOuuplY9U194xz/QPp3xHraWEk5wAAAABJRU5ErkJggg==`,
        src: '/horse-long.jpg',
        // srcSet:
        //   'https://www.gatsbyjs.com/static/6b4ceb373f586f42aee9d8b8357ba152/497c6/f8029d0e4b546e663c80e7448d2dde13.png',
        // srcSetWebp: '',
      },
    },
  },
  fixedLongEager: {
    childImageSharp: {
      fixed: {
        base64: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAACrElEQVQ4y61SWU8TURSeH+aDGlJ/Aa++oIkWTYyJMQFqGhA3WolJ34QHA5EaFhMsagCVRhMTxUJDWLrTYbrYztbpdGg7y+e9F2ZSDA8+eJKTc8/23e+ce7mvK0B8xcH7qHyqCmJzIj680bC2AKzO21iZMxB7rWN1wcbaIo1ZJCZ7PWuLTXz/CHwjWFw5Y6K0rUIoOBDyNo5yFgSizOYd8FkL2X0d2b2mFxNyNqstES1mukj++I2dTZHluVZLQzK5ixMxoTVlmNYxjGMNekth5+N2E52ugaZ+4jc0ifgtVp/O7OHipQvwXbmMWr0MznQAg2IRa9s2ul0TJlHbsmGZFotZlgWTnGnOInGza5GczZTGmk2dKc1xFAiOA9tx8D+EcwiQcwr2bpnH9NQG5uffIpcrg+drODysIJ+vQ+CrSGZ2kVcrEOsiKpUKU03TWC+dhOJw1KEjUVla+oTBwTsYGQngeXgS1wauY2IihOHhh/j1M4mr/gHcGLuHB4EAiY1gdHQMkUiE9brEOJcd3UEuJxBrolxWkM5XUTySIIotHBzwhIkOTW1Ak1RUq1UktjchySJjaBgGY+iNTCUajcLvv4nJyTCehSbwYuguwsEhrK6vY3r6JUKhEMbHxxEg7J48fYz7g48QCU/h1m0/YrGYx9IDLBQOsbW1jUQigZ29fXyee4X48hK0loFSqYRUKoXZ2VnMzMwgm02DT0kopEvYiH+BLCveHjkXuVfa7TYaBEhuaFAUGY1Gg1iFNMpQVRW6rkM3tDM9LobH0P1v1Kc7Eet1wiTDmFGGkiQxMLozWmua5pkeb+TeW9zXjsfj6OvrQ39/P3w+H4LBIGq1GnmsMrOCILBLz5uO66XsJulIhUIBxWKR/ME8e9VOp8NW4Vr38t6+M4B/7+Jf5LzaPwbARTZsQturAAAAAElFTkSuQmCC`,
        src: '/horse-long.jpg',
        // srcSet:
        //   'https://www.gatsbyjs.com/static/5a648655cd9214c841114ac77bf47de8/497c6/df04c24eb07358c729b00b731c0a08f4.png',
        // srcSetWebp: '',
      },
    },
  },
};

export default function Home({ GatsbyImage }) {
  // const fluidLong = data.fluidLong.childImageSharp.fluid;
  const fixedLong = data.fixedLong.childImageSharp.fixed;
  const fixedLongEager = data.fixedLongEager.childImageSharp.fixed;
  // const fluidImages = [
  //   {
  //     srcSet: removeNewLines(fluidLong.srcSetWebp),
  //     type: 'image/webp',
  //   },
  // ];
  const fixedImages = [
    // {
    //   srcSet: fixedLong.srcSetWebp,
    //   type: 'image/webp',
    // },
  ];

  const { useGatsbyImage } = GatsbyImage;

  const {
    getWrapperProps,
    getPlaceholderProps,
    getMainImageProps,
  } = useGatsbyImage({
    width: 500,
    height: 600,
    placeholder: {
      fallback: fixedLong.base64,
    },
    images: {
      fallback: {
        src: fixedLong.src,
        srcSet: fixedLong.srcSet,
      },
      sources: fixedImages,
    },
  });

  return (
    <React.Fragment>
      <div>Hello world!</div>
      <GatsbyImage.GatsbyImage
        width={500}
        height={600}
        // loading="eager"
        placeholder={{
          fallback: fixedLong.base64,
        }}
        images={{
          fallback: {
            src: fixedLong.src,
            srcSet: fixedLong.srcSet,
          },
          sources: fixedImages,
        }}
        alt="hello"
      />
      <div style={{ marginTop: '100vh' }}></div>
      <GatsbyImage.GatsbyImage
        width={500}
        height={600}
        loading="eager"
        placeholder={{
          fallback: fixedLongEager.base64,
        }}
        images={{
          fallback: {
            src: fixedLongEager.src,
            srcSet: fixedLongEager.srcSet,
          },
          sources: fixedImages,
        }}
        alt="hello"
      />
      <div style={{ marginTop: '100vh' }}></div>

      <GatsbyImage.GatsbyImageHydrator>
        <div {...getWrapperProps()}>
          <GatsbyImage.Placeholder {...getPlaceholderProps()} />
          <GatsbyImage.MainImage {...getMainImageProps()} alt="hello" />
        </div>
      </GatsbyImage.GatsbyImageHydrator>
    </React.Fragment>
  );
}
