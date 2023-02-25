import React from "react";
import Slider from "react-slick";
import { useStaticQuery, graphql } from "gatsby";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/components/sections/organizations.scss"; 

const OranizationsSlider = () => {

  const data = useStaticQuery(pageQuery);
  const organizations = data.allMarkdownRemark.nodes
  let slickSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    arrows: true,
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 769, // mobile breakpoint
        settings: {
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        }
      }
    ]
  }
  return (
    <Slider className="organizations" {...slickSettings}>
      {organizations.map(({frontmatter, fields}) => {
        const { title, image, startdate, date, position, present } = frontmatter
        return (
          <div className="organization" key={fields.slug}>
            <figure className="image">
              <img className="photo" src={`/images/${image}`} alt={title + ' logo'} />
            </figure>
            <h5 className="name">{title}</h5>
            <h4 className="job-title">{position}</h4>
            <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{present ? 'Present' : date }</span></p>
          </div>
        )
      })}
      
    </Slider>
  );
}

export default OranizationsSlider

const pageQuery = graphql`
  query OranizationsQuery{
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: "organizations" }}},
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          startdate(formatString: "MMM YYYY")
          present
          date(formatString: "MMM YYYY")
          title
          categories
          position
          image
        }
      }
    }
  }
`