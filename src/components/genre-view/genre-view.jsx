import React from "react";
import Button from "react-bootstrap";
import { Link } from "react-router-dom";
import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = "";
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className="gemre-container">
        <div className="genre-name">
          <span className="label"> Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
      </div>
    );
  }
}
