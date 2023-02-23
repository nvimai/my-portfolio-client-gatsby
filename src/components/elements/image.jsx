import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// Note: You can change "images" to whatever you'd like.

const Image = (props) => {
  const data = useStaticQuery(query);

  const image = data.images.edges.find(n => {
    return n.node.relativePath.includes(props.filename);
  });

  if (!image) {
    return null;
  }

  return (
    <Img alt={props.alt} style={props.style} imgStyle={props.imgStyle} fixed={image.node.childImageSharp.fixed} />
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
            fixed(height: 100, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`