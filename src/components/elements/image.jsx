import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// Note: You can change "images" to whatever you'd like.

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fixed(height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename);
      });
      if (!image) {
        return null;
      }

      //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      // return <Img alt={props.alt} style={props.style} imgStyle={props.imgStyle} fluid={image.node.childImageSharp.fluid} />;
      return <Img alt={props.alt} style={props.style} imgStyle={props.imgStyle} fixed={image.node.childImageSharp.fixed} />;
    }}
  />
);

export default Image;