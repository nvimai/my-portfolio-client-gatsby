import React from 'react';
import { Link } from "gatsby";
import '../../styles/components/elements/projectcard.scss';
import Image from './image';

const ProjectCard = (props) => {
  const { title, position, startdate, enddate, present, tags, image } = props.frontmatter;
  const { slug } = props.fields;
  return (
    <div className="column is-one-quarter-tablet">
      <div className="card-project card">
        <div className="card-image">
          <figure className="image">
            {/* <img className="photo" src={image} alt={title} /> */}
            <Image
              formats={["auto", "webp", "avif"]}
              layout="fixed"
              filename={image}
              alt={title}
              imgStyle={{
                height: `100%`,
                width: `auto`,
                margin: `auto`,
              }}
            />
          </figure>
        </div>
        <div className="card-content">
          <Link
            style={{ boxShadow: `none` }}
            to={`/projects${slug?slug:''}`}
          >
            <h5 className="name">{title}</h5>
            <h4 className="job-title">{position}</h4>
          </Link>
          {tags ? tags.map((tag, i) => {
            return (
              <p className="tag" key={i}>{tag}</p>
            )
          }) : ''}
        </div>
        <div className="card-footer">
          <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{present ? 'Present' : enddate }</span></p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;