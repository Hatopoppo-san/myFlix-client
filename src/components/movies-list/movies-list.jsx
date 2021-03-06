import "./movies-list.scss";

import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className='main-view' />;

  return (
    <div className='movies-list'>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      <Row className='movie-card-container justify-content-md-center'>
        {filteredMovies.map((m) => (
          <Col key={m._id} xs={4}>
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
