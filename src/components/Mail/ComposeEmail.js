import React, { useState } from "react";
import MailBoxEditor from "./MailBoxEditor";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import EmailForm from "./EmailForm";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ComposeEmail.module.css";
import useSendEmail from "./useSendEmail";
import { mailActions } from "../../store/mail-slice";

const ComposeEmail = ({ onHide, show, setSentEmailContent }) => {
  const dispatch = useDispatch();
  const { sendEmail } = useSendEmail();
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const emailCounts = useSelector((state) => state.mail.emailCounts);


  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    // const emailContent = JSON.stringify(convertToRaw(contentState));
    const emailContent = stateToHTML(contentState);
    // const emailContent = convertContentToHTML(emailContent)
    setEmailContent(emailContent);
  };

  const handleSendEmail = async () => {
    const senderId = localStorage.getItem("userEmail");
    // console.log(senderId);

    // console.log("Email Subject: " + subject);
    // console.log("Recipient: " + recipient);
    // console.log("Email Content: " + emailContent);

    const emailData = await sendEmail(senderId, recipient, subject, emailContent);
    const timestampKey = Date.now().toString();
    setSentEmailContent((prevData) => ({
      ...prevData,
      [timestampKey]: emailData,
    }));

    dispatch(mailActions.updateMailCount({
      inboxCount: emailCounts.inboxCount,
      sentCount: emailCounts.sentCount + 1,
      trashCount: emailCounts.trashCount,
    }));

    setSubject("");
    setRecipient("");
    setEmailContent("");
    setEditorState(() => EditorState.createEmpty());
    onHide();

  };

  const toggleFullScreen = () => {
    setIsFullScreen((prevFullScreen) => !prevFullScreen);
  };

  return (
    <Modal show={show} onHide={onHide} centered fullscreen={isFullScreen}>
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
        <Button
          onClick={toggleFullScreen}
          className={
            isFullScreen ? `${styles.fullscreen}` : `${styles.smallscreen}`
          }
        >
          <span>[&nbsp;&nbsp;]</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeEmail;

