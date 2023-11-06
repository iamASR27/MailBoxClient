import React from "react";
import { Button } from "react-bootstrap";

const SentEmailDetails = ({ selectedEmail, onClick }) => {
  // console.log("selectedEmail", selectedEmail);

  return (
    <div>
      <Button onClick={onClick} variant="outline-primary">
        Go Back
      </Button>
      <h2>{selectedEmail.subject}</h2>
      <p>{selectedEmail.to}</p>
      {new Date(selectedEmail.timestamp).toLocaleString()}
      <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
    </div>
  );
};

export default SentEmailDetails;
