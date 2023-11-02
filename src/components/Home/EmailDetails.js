import React from "react";
import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

const EmailDetails = ({ selectedEmail, onClick }) => {
  // const { emailKey } = useParams();

  return (
    <div>
      {/* <Button as={Link} to="/home" variant="outline-primary">
        Go Back
      </Button> */}
      <Button onClick={onClick} variant="outline-primary">
        Go Back
      </Button>
      <h2>{selectedEmail.subject}</h2>
      <p>{selectedEmail.from}</p>
      {new Date(selectedEmail.timestamp).toLocaleString()}
      <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
    </div>
  );
};

export default EmailDetails;
