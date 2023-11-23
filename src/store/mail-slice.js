import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inbox: {},
    sent: {},
    trash: {},
    emailCounts: {
      inboxCount: 0,
      sentCount: 0,
      trashCount: 0,
    },
  },
  reducers: {
    storeInboxMail(state, action) {
     state.inbox = action.payload;
     state.emailCounts.inboxCount = Object.keys(state.inbox || {}).length;
    //  console.log(state.inbox)
    },
    storeSentMail(state, action) {
     state.sent = action.payload;
     state.emailCounts.sentCount = Object.keys(state.sent || {}).length;
    },
    storeTrashMail(state, action) {
     state.trash = action.payload;
     state.emailCounts.trashCount = Object.keys(state.trash || {}).length;
    },
    updateMailCount(state, action) {
      state.emailCounts = {
        ...state.emailCounts,
        inboxCount: action.payload.inboxCount,
        sentCount: action.payload.sentCount,
        trashCount: action.payload.trashCount,
      };
    },
}});

export const mailActions = mailSlice.actions;

export default mailSlice;
