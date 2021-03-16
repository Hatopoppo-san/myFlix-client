import React from "react";
import Button from "react-bootstrap";
import { Link } from "react-router-dom";
import "./director-view.scss";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = "";
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="direrctor-container">
        <div className="director-name">
          <span className="label"> Name: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="director-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Director.Description}</span>
        </div>
        <div className="director-birth">
          <span className="label">Birth: </span>
          <span className="value">{movie.Director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="label">Death: </span>
          <span className="value">{movie.Director.Death}</span>
        </div>
      </div>
    );
  }
}
