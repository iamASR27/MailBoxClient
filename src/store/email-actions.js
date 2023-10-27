import { uiActions } from "./ui-slice";
import { sendEmailToInbox, sendEmailToSentbox } from "../components/Mail/EmailService";

 const sendEmail = (senderId, recipientId, subject, content) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending email!",
      })
    );
    try {
      const timestamp = new Date().toISOString();

      const emailData = {
        from: senderId,
        to: recipientId,
        subject,
        content,
        timestamp,
      };

      // Send the email to recipient's inbox
      const inboxResponse = await sendEmailToInbox(recipientId, emailData);

      // Send a copy to the sender's sent folder
      const sentResponse = await sendEmailToSentbox(senderId, emailData);

      if (inboxResponse && sentResponse) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Email sent successfully!",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Something went wrong!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Something went wrong!",
        })
      );
    }
  };
};

export default sendEmail;
