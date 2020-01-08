import React, { Component } from 'react';
import { Link } from "gatsby"
import '../styles/components/projectcard.scss';

export default class ProjectCard extends Component {
	constructor(props) {
    super(props);
    console.log(props)
		this.state = {
      project: this.props.frontmatter,
      fields: this.props.fields,
      excerpt: this.props.excerpt,
		};
	}

  render() {
    const { title, position, startdate, enddate, tags, image, url } = this.state.project
    const { slug } = this.state.fields

    return (
      <div className="column is-one-quarter-tablet">
        <div className="card-project card">
          <div className="card-image">
            <figure class="image is-2by1">
              <img className="photo" src={image} alt={title} />
            </figure>
          </div>
          <div className="card-content">
            <Link
              style={{ boxShadow: `none` }}
              to={`projects${slug?slug:''}`}
            >
              <h5 className="name">{title}</h5>
              <h4 className="job-title">{position}</h4>
            </Link>
            {tags ? tags.map((tag) => {
              return (
                <p className="tag">{tag}</p>
              )
            }) : ''}
          </div>
          <div className="card-footer">
            <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{enddate ? enddate : 'Present'}</span></p>
          </div>
        </div>
      </div>
		);
	}
}