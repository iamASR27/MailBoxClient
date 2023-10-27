export const sendEmailToInbox = async (recipientId, emailData) => {
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

      const data = response.json();

      return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailToSentbox = async (senderId, emailData) => {
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

      const data = response.json();

      return data;
  } catch (error) {
    console.log(error);
  }
};
