// import { useDispatch, useSelector } from "react-redux";
// import { mailActions } from "../../store/mail-slice";

const useEmailService = () => {
  // const dispatch = useDispatch();
  // const emailCounts = useSelector((state) => state.mail.emailCounts);

  const sendEmailToInbox = async (recipientId, emailData) => {
    console.log(recipientId);
    recipientId = recipientId.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-167c3-default-rtdb.firebaseio.com/users/${recipientId}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("Failed to send email to receiver inbox!");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmailToSentbox = async (senderId, emailData) => {
    senderId = senderId.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-167c3-default-rtdb.firebaseio.com/users/${senderId}/sentbox.json`,
        {
          method: "POST",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("Failed to send email to user's sentbox");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserEmail = async (userEmail, emailData, emailKey) => {
    // console.log(recipientId);
    const userId = userEmail.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-167c3-default-rtdb.firebaseio.com/users/${userId}/inbox/${emailKey}.json`,
        {
          method: "PUT",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("Failed to send email to receiver inbox!");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInboxMails = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      const userId = userEmail.replace(/[@.]/g, "");
      // console.log(userId)

      try {
        const response = await fetch(
          `https://mailbox-client-167c3-default-rtdb.firebaseio.com/users/${userId}/inbox.json`
        );

        if (!response) {
          throw new Error("Failed to send email to user's inbox");
        }

        const data = await response.json();
        // dispatch(mailActions.storeInboxMail(data));
        // dispatch(mailActions.updateMailCount((prevCounts) => ({
        //   ...prevCounts,
        //   inboxCount: Object.keys(data).length + prevCounts.inboxCount,
        //   // sentCount: prevCounts.sentCount,
        //   // trashCount: prevCounts.trashCount,
        // })));
        // console.log(data);
        // dispatch(mailActions.updateMailCount({
        //   inboxCount: Object.keys(data).length,
        //   sentCount: emailCounts.sentCount,
        //   trashCount: emailCounts.trashCount,
        // }));
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchSentboxMails = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      const userId = userEmail.replace(/[@.]/g, "");
      // console.log(userId)

      try {
        const response = await fetch(
          `https://mailbox-client-167c3-default-rtdb.firebaseio.com/users/${userId}/sentbox.json`
        );

        if (!response) {
          throw new Error("Failed to send email to user's sentbox");
        }

        const data = await response.json();
        // dispatch(mailActions.storeSentMail(data));
        // dispatch(mailActions.updateMailCount((prevCounts) => ({
        //   ...prevCounts,
        //   // inboxCount: prevCounts.inboxCount,
        //   sentCount: Object.keys(data).length + prevCounts.sentCount,
        //   // trashCount: prevCounts.trashCount,
        // })));
        //  dispatch(mailActions.updateMailCount({
        //   inboxCount: emailCounts.inboxCount,
        //   sentCount: Object.keys(data).length,
        //   trashCount: emailCounts.trashCount,
        // }));
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTrashBoxMails = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      const userId = userEmail.replace(/[@.]/g, "");
      // console.log(userId)

      try {
        const response = await fetch(
          `https://mailbox-client-167c3-default-rtdb.firebaseio.com/users/${userId}/trash.json`
        );

        if (!response) {
          throw new Error("Failed to send email to user's trashbox");
        }

        const data = await response.json();
        // dispatch(mailActions.storeTrashMail(data));
        // dispatch(mailActions.updateMailCount((prevCounts) => ({
        //   ...prevCounts,
        //   // inboxCount: prevCounts.inboxCount,
        //   // sentCount: prevCounts.sentCount,
        //   trashCount: Object.keys(data).length + prevCounts.trashCount,
        // })));
        // dispatch(mailActions.updateMailCount({
        //   inboxCount: emailCounts.inboxCount,
        //   sentCount: emailCounts.sentCount,
        //   trashCount: Object.keys(data).length,
        // }));
        
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return {
    sendEmailToInbox,
    sendEmailToSentbox,
    updateUserEmail,
    fetchInboxMails,
    fetchSentboxMails,
    fetchTrashBoxMails,
  };
};

export default useEmailService;
