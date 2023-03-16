import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

type Props = {
  filename: string;
  imgStyle?: object;
  alt: string;
}

const Image = (props: Props) => {
  const data = useStaticQuery(query);
  const image = data.images.edges.find((n: any) => {
    return n.node.relativePath.includes(props.filename);
  });

  if (!image) {
    return null;
  }
  console.log(image)

  return (
    <GatsbyImage
      image={image.node.childImageSharp.gatsbyImageData}
      alt={props.alt}
      imgStyle={props.imgStyle}
    />
  )
};

export default Image;


export const query = graphql`
  query {
    images: allFile(filter: {extension: {ne: "md"}}) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            gatsbyImageData(height: 200)
          }
        }
      }
    }
  }
`