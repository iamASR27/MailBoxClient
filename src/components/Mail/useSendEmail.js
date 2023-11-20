import { uiActions } from "../../store/ui-slice";
import useEmailService from "./useEmailService";
import { useDispatch } from "react-redux";
// import { mailActions } from "../../store/mail-slice";

const useSendEmail = () => {
  const dispatch = useDispatch();
  const {sendEmailToInbox, sendEmailToSentbox} = useEmailService();

  const sendEmail = async (senderId, recipientId, subject, content) => {
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
        // dispatch(mailActions.storeSentMail(inboxResponse));
  
        // Send a copy to the sender's sent folder
        const sentResponse = await sendEmailToSentbox(senderId, emailData);
        // dispatch(mailActions.storeSentMail(sentResponse));
  
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
    return { sendEmail };
  };

export default useSendEmail;

