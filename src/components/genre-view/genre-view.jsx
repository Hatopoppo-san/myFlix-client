import React from "react";
import { Button } from "react-bootstrap";
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
      <div className='genre-container'>
        <div className='genre-name'>
          <span className='label'> Name: </span>
          <span className='value'>{genre.Name}</span>
        </div>
        <div className='genre-name'>
          <span className='label'> Description: </span>
          <span className='value'>{genre.Description}</span>
        </div>
        <Link to={`/`}>
          <Button variant='link'>Back</Button>
        </Link>
      </div>
    );
  }
}
