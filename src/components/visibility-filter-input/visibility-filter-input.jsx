import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Form, Control } from "react-bootstrap";

import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  const style = {
    marginTop: 55,
    position: "fixed",
    zIndex: 8,
  };

  return (
    <Form.Control
      style={style}
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder='filter'
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
