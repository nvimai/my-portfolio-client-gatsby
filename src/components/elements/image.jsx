import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

// Note: You can change "images" to whatever you'd like.

const Image = (props) => {
  const data = useStaticQuery(query);
  const image = data.images.edges.find(n => {
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