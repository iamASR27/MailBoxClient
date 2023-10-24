import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default LoadingSpinner;
