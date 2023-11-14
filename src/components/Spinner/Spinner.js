import React from 'react';
import { Spinner } from "react-bootstrap";

const LoadingSpinner = (props) => {
  return (
    <Spinner animation="border" role="status" size={props.size}>
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default LoadingSpinner;
