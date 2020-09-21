# Gatsby-image next generation

Speedy, optimized images without the work.

gatsby-image is a React component specially designed to give your users a great image experience. It combines speed and best practices. You can use any image processing library that you want. We suggest using gatsby-plugin-sharp as your image processor. Saving images locally improves [the important health metrics](https://web.dev/vitals/) for your site.

Note: gatsby-image is not a drop-in replacement for <img />. It's optimized for fixed width/height images and images that stretch the full-width of a container. You can build your own Gatsby-Image with the utilities we export from this package.

## Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Install](#install)
- [How to use](#how-to-use)
- [Types of Responsive Images](#two-types-of-responsive-images)
- [Fixed Queries](#fixed-queries)
- [Fluid Queries](#fluid-queries)
- [Gatsby Image Nextgen Props](#@wardpeet/gatsby-image-props)

## Problem

Large, unoptimized images dramatically slow down your site.

But creating optimized images for websites has long been a thorny problem.
Ideally you would:

- Resize large images to the size needed by your design.
- Generate multiple smaller images so smartphones and tablets don't download
  desktop-sized images.
- Strip all unnecessary metadata and optimize JPEG and PNG compression.
- Efficiently lazy load images to speed initial page load and save bandwidth.
- Use the "blur-up" technique or a
  "[traced placeholder](https://github.com/gatsbyjs/gatsby/issues/2435)" SVG to
  show a preview of the image while it loads.
- Hold the image position so your page doesn't jump while images load.

Doing this consistently across a site feels like a task that can never be completed. You manually
optimize your images and then… several images are swapped in at the last minute
or a design-tweak shaves 100px of width off your images.

Most solutions involve a lot of manual labor and bookkeeping to ensure every
image is optimized.

This isn't ideal. Optimized images should be easy and the default.

## Solution

With Gatsby, we can make images way _way_ better.

`@wardpeet/gatsby-image-nextgen` is designed to work seamlessly with Gatsby's native image
processing capabilities powered by GraphQL and Sharp. To produce perfect images,
you need only:

1. Import `{ GatsbyImage } from "@wardpeet/gatsby-image-nextgen"` and use it in place of the built-in `img`.
2. Write a GraphQL query with all necessary fields needed by `@wardpeet/gatsby-image-nextgen`.

The GraphQL query creates multiple thumbnails with optimized JPEG and PNG
compression. The `@wardpeet/gatsby-image-nextgen` component automatically sets up the "blur-up"
effect as well as lazy loading of images further down the screen.

## Install

`npm install --save @wardpeet/gatsby-image-nextgen`

Depending on the gatsby starter you used, you may need to include [gatsby-transformer-sharp](/packages/gatsby-transformer-sharp/) and [gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/) as well, and make sure they are installed and included in your gatsby-config.

```shell
npm install --save gatsby-transformer-sharp gatsby-plugin-sharp
```

Then in your `gatsby-config.js`:

```js
plugins: [
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `@wardpeet/gatsby-image-nexgen`,
];
```

Also, make sure you have set up a source plugin, so your images are available in `graphql` queries. For example, if your images live in a project folder on the local filesystem, you would set up `gatsby-source-filesystem` in `gatsby-config.js` like so:

```js
const path = require(`path`);

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `@wardpeet/gatsby-image-nexgen`,
  ],
};
```

## How to use

This is what a component using `@wardpeet/gatsby-image` looks like:

```jsx
// TODO We don't have proper Fragments yet so this isn't user friendly yet
import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from '@wardpeet/gatsby-image-nexgen';

export default ({ data }) => (
  <div>
    <h1>Hello gatsby-image</h1>
    <GatsbyImage
      placeholder={{ fallback: data.file.childImageSharp.fixed.fallback }}
      images={{
        fallback: {
          src: data.file.childImageSharp.fixed.src,
          srcSet: data.file.childImageSharp.fixed.srcSet,
        },
        sources: [
          {
            src: data.file.childImageSharp.fixed.srcWebp,
            srcSet: data.file.childImageSharp.fixed.srcSetWebp,
            type: 'image/webp',
          },
        ],
      }}
      width={data.file.childImageSharp.fixed.width}
      height={data.file.childImageSharp.fixed.height}
      layout="fixed"
      alt="my gatsby image"
    />
  </div>
);

export const query = graphql`
  query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          fallback: base64
          width
          height
          src
          srcSet
          srcWebp
          srcSetWebp
        }
      }
    }
  }
`;
```

### Upgrading from the gatsby-image@2

You can use the compat layer to make the transformation easier.

```jsx
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-image/compat';

export default ({ data }) => (
  <div>
    <h1>Hello gatsby-image</h1>
    <GatsbyImage fixed={data.file.childImageSharp.fixed} />
  </div>
);

export const query = graphql`
  query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
```

## Two types of responsive images

There are two types of responsive images supported by gatsby-image.

1. Images that have a _fixed_ width and height
1. Images that stretch across a _fluid_ container

In the first scenario, you want to vary the image's size for different screen
resolutions -- in other words, create retina images.

For the second scenario, you want to create multiple sizes of thumbnails for
devices with widths stretching from smartphone to wide desktop monitors.

To decide between the two, ask yourself: "do I know the exact size this image
will be?" If yes, it's the first type. If no and its width and/or height need to
vary depending on the size of the screen, then it's the second type.

In Gatsby's GraphQL implementation, you query for the first type by querying a
child object of an image called `fixed` — which you can see in the sample
component above. For the second type, you do a similar query but for a child
object called `fluid`.

## `@wardpeet/gatsby-image-nextgen` props

| Name                    | Type            | Description                                                 |
| ----------------------- | --------------- | ----------------------------------------------------------- |
| placeholder             | object          | Object holding the placeholder image                        |
| placeholder.fallback    | string          | Source for the image                                        |
| images                  | array           | List of different image sources (WebP, ...)                 |
| images.fallback         | object          |                                                             |
| images.fallback.src     | string          | The image src if srcset is not supported                    |
| images.fallback.srcSet  | string          |                                                             |
| images.fallback.sizes   | string          |                                                             |
| images.sources          | array           | List of different image sources (WebP, ...)                 |
| images.sources[].srcSet | string          |                                                             |
| images.sources[].sizes  | string          |                                                             |
| images.sources[].type   | string          |                                                             |
| images.sources[].media  | string          |                                                             |
| layout                  | string          | "fixed", "responsive" or "intrinsic" are values for layout. |
| alt                     | string          | Passed to the `img` element. Defaults to an empty string    |
| width                   | number          | Width of the image                                          |
| height                  | number          | Height of the image                                         |
| as                      | React Component | The component that wraps the Gatsby Image.                  |
