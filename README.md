# Gatsby-image next generation

Speedy, optimized images without the work.

gatsby-image is a React component specially designed to work seamlessly with Gatsby's GraphQL queries. It combines Gatsby's native image processing capabilities with advanced image loading techniques to easily and completely optimize image loading for your sites. gatsby-image uses gatsby-plugin-sharp to power its image transformations.

Note: gatsby-image is not a drop-in replacement for <img />. It's optimized for fixed width/height images and images that stretch the full-width of a container. Some ways you can use <img /> won't work with gatsby-image.

## Usage

TODO create new fragments for easy usage

```js
import { GatsbyImage } from '@wardpeet/gatsby-image';

export function Page({ data }) {
  const fluid = data.fluid.childImageSharp.fluid;
  const fixed = data.fixed.childImageSharp.fixed;
  return (
    <div>
      <GatsbyImage
        aspectRatio={fluid.aspectRatio}
        placeholder={{
          fallback: fluid.base64,
        }}
        images={{
          fallback: {
            src: fluid.src,
            srcSet: fluid.srcSet,
          },
          sources: [
            {
              type: 'image/webp',
              src: fluid.srcWebp,
              srcSetWebp: fluid.srcSetWebp,
            },
          ],
        }}
        alt="fluid"
      />
      <GatsbyImage
        width={fixed.width}
        height={fixed.height}
        placeholder={{
          fallback: fixed.base64,
        }}
        images={{
          fallback: {
            src: fixed.src,
            srcSet: fixed.srcSet,
          },
          sources: [
            {
              type: 'image/webp',
              src: fixed.srcWebp,
              srcSetWebp: fixed.srcSetWebp,
            },
          ],
        }}
        alt="fixed"
      />
    </div>
  );
}

export const query = graphql`
  query {
    fixed: file(relativePath: { eq: "image.jpg" }) {
      childImageSharp {
        fixed(width: 500, height: 600) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    fixed: file(relativePath: { eq: "image.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`;
```

## Compat v2

```js
import { GatsbyImage } from '@wardpeet/gatsby-image/compat';

export function Page({ data }) {
  return (
    <div>
      <GatsbyImage fluid={data.fluid.childImageSharp.fluid} alt="fluid" />
      <GatsbyImage fixed={data.fixed.childImageSharp.fixed} alt="fixed" />
    </div>
  );
}

export const query = graphql`
  query {
    fixed: file(relativePath: { eq: "image.jpg" }) {
      childImageSharp {
        fixed(width: 500, height: 600) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    fixed: file(relativePath: { eq: "image.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`;
```
