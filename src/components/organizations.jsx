import React from "react";
import Slider from "react-slick";
import { StaticQuery, graphql } from "gatsby";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/components/organizations.scss";
 

function OranizationsSlider() {
  return (
    <StaticQuery
      query={oranizationsQuery}
      render={data => {
        const organizations = data.allMdx.edges
        let settings = {
          dots: true,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          pauseOnHover: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
                breakpoint: 768, // tablet breakpoint
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
          ]
        }
        return (
          <Slider className="organizations" {...settings}>
            {organizations.map(({node}) => {
              const { title, image, startdate, enddate, position } = node.frontmatter
              return (
                <div className="organization" key={node.fields.slug}>
                  <img src={image} className="photo" alt={title + ' logo'} />
                  <h5 className="name">{title}</h5>
                  <h4 className="job-title">{position}</h4>
                  <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{enddate ? enddate : 'Present'}</span></p>
                </div>
              )
            })}
            
          </Slider>
        );
      }}
    />
  )
}

export default OranizationsSlider

const oranizationsQuery = graphql`
  query OranizationsQuery{
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { categories: { eq: "organizations" }}},
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            startdate(formatString: "MMM YYYY")
            enddate(formatString: "MMM YYYY")
            title
            position
            categories
            image
          }
        }
      }
    }
  }
`