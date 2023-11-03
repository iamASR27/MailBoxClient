import React from "react";
import { Button } from "react-bootstrap";

const EmailDetails = ({ selectedEmail, onClick }) => {
  console.log("selectedEmail", selectedEmail);

  return (
    <div>
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
