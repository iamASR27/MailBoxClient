import React, { useState } from "react";
import MailBoxEditor from "./MailBoxEditor";
import { EditorState, convertToRaw } from "draft-js";
import EmailForm from "./EmailForm";
import { Button } from "react-bootstrap";
import sendEmail from "../../store/email-actions";
import { useDispatch } from "react-redux";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  // const [emailContent, setEmailContent] = useState(() => EditorState.createEmpty());
  const [emailContent, setEmailContent] = useState("");

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    const emailContent = JSON.stringify(convertToRaw(contentState));
    setEmailContent(emailContent);
  };

  const handleSendEmail = () => {
    const senderId = localStorage.getItem("userEmail");
    console.log(senderId)
    
    console.log("Email Subject: " + subject);
    console.log("Recipient: " + recipient);
    console.log("Email Content: " + emailContent);

    dispatch(sendEmail(senderId, recipient, subject, emailContent));



    setSubject("");
    setRecipient("");
    setEmailContent("");
    setEditorState(() => EditorState.createEmpty())
  };

  // useEffect(() => {
  //   console.log("Email Content:", emailContent);
  // }, [emailContent]);


  return (
    <div>
      <h1>Welcome to your mail box</h1>
      <div className={styles.home}>
        <EmailForm
          setSubject={setSubject}
          setRecipient={setRecipient}
          subject={subject}
          recipient={recipient}
        />
        <MailBoxEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={handleSendEmail}
        >
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default Home;
