import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { GatsbyImage } from '@wardpeet/gatsby-image/compat';

const removeNewLines = (str) => str.replace(/\n/g, '');

export default function Home({ data }) {
  const fluidLong = data.fluidLong.childImageSharp.fluid;
  const fixedLong = data.fixedLong.childImageSharp.fixed;
  // const fluidImages = [
  //   {
  //     srcSet: removeNewLines(fluidLong.srcSetWebp),
  //     type: 'image/webp',
  //   },
  // ];
  // const fixedImages = [
  //   // {
  //   //   srcSet: removeNewLines(fixedLong.srcSetWebp),
  //   //   type: 'image/webp',
  //   // },
  // ];

  return (
    <>
      <div>Hello world!</div>
      <Link to="/page-2/">Page 2</Link>
      <GatsbyImage fixed={fixedLong} alt="hello" />
      <div style={{ marginTop: '200vh' }} />
      <GatsbyImage fluid={fluidLong} alt="hello2" />
      {/* <GatsbyImage
        width={500}
        height={600}
        placeholder={{
          fallback: fixedLong.base64,
        }}
        images={{
          fallback: {
            src: fixedLong.src,
            srcSet: removeNewLines(fixedLong.srcSet),
          },
          sources: fixedImages,
        }}
        alt="hello"
      />

      <GatsbyImage
        style={{ marginTop: '50px' }}
        width={500}
        height={600}
        placeholder={{
          fallback: fixedLong.base64,
        }}
        images={{
          fallback: {
            src: fixedLong.src,
            srcSet: removeNewLines(fixedLong.srcSet),
          },
          sources: fixedImages,
        }}
        alt="hello2"
        loading="eager"
      /> */}
      {/* <GatsbyImage
        style={{ marginTop: '50px' }}
        width={300}
        height={400}
        placeholder={{
          fallback: fluidLong.base64,
        }}
        images={{
          fallback: {
            src: fluidLong.src,
            srcSet: removeNewLines(fluidLong.srcSet),
          },
          sources: fluidImages,
        }}
        alt="hello 2"
      /> */}
      {/* <div style={{ position: 'relative', width: 200, height: 200 }}>
        <Placeholder fallback={fixed.base64} />
        <Picture
          fallback={{ src: fixed.src }}
          images={fixedImages}
          style={{ position: 'relative' }}
        />
      </div> */}
    </>
  );
}

export const query = graphql`
  query {
    fixedLong: file(relativePath: { eq: "horse-long.jpg" }) {
      childImageSharp {
        fixed(width: 500, height: 600) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    fixedWide: file(relativePath: { eq: "horse-wide.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }

    fluidLong: file(relativePath: { eq: "horse-long.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300, quality: 60) {
          ...GatsbyImageSharpFluid_withWebp
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    fluidWide: file(relativePath: { eq: "horse-wide.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300, quality: 60) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    desktopImage2: file(relativePath: { eq: "horse-wide.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 61, srcSetBreakpoints: [500]) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
