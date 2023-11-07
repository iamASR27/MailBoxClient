import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const EmailDetails = ({ onClick }) => {
  // const [emailData, setEmailData] = useState(null);

  const location = useLocation();
  const emailData = location.state.emailData;
  console.log(location)
 
    // const queryParams = new URLSearchParams(location.search);
    // const encodedEmailData = queryParams.get("emailData");
    // const decodedEmailData = JSON.parse(decodeURIComponent(encodedEmailData));
    // console.log(decodedEmailData)
    // setEmailData(decodedEmailData)
   

  return (
    <div>
      <Button onClick={onClick} variant="outline-primary">
        Go Back
      </Button>
      <h2>{emailData.subject}</h2>
      <p>{emailData.from}</p>
      {new Date(emailData.timestamp).toLocaleString()}
      <div dangerouslySetInnerHTML={{ __html: emailData.content }} />
    </div>
  );
};

export default EmailDetails;
