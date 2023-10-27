import React from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./MailBoxEditor.module.css";

const MailBoxEditor = ({ editorState, onEditorStateChange }) => {

  return (
    <>
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={styles["wrapper-class"]}
        editorClassName={styles["editor-class"]}
        toolbarClassName={styles["toolbar-class"]}
      />
    </div>
   </>
  );
};

export default MailBoxEditor;
