import React from 'react';
import { Link } from "gatsby";
import '../../styles/components/elements/projectcard.scss';
import { ProjectType } from '../../models';

const ProjectCard = (props: ProjectType) => {
  const { title, position, startdate, date, present, tags, image } = props.frontmatter;
  const { slug } = props.fields;
  return (
    <div className="column is-one-quarter-tablet">
      <div className="card-project card">
        <div className="card-image">
          <figure className="image">
            <img className="photo" src={`/images/${image}`} alt={title} />
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
          <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{present ? 'Present' : date }</span></p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;