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
          <span className="value">{movie.director.Name}</span>
        </div>
      </div>
    );
  }
}
