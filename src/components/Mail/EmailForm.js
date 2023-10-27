import React from 'react';
import { Form } from 'react-bootstrap';

const EmailForm = ({ setRecipient, setSubject, recipient, subject}) => { 

    const handleRecipientChange = (e) => {
        const newValue = e.target.value;
        setRecipient(newValue);
      };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>To:{" "}</Form.Label>
        <Form.Control
          type="email"
          placeholder="Recipient"
          value={recipient}
        //   onChange={(e) => setRecipient(e.target.value)}
          onChange={handleRecipientChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Subject:{" "}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </Form.Group>
    </Form>
  );
}

export default EmailForm;
