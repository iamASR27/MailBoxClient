import React, { useEffect, useState, useCallback } from "react";
import SignupForm from "./components/Login/SignUp";
import LoginForm from "./components/Login/Login";
import Notification from "./components/UI/Notification";
import ForgotPassword from "./components/Login/ForgotPassword";
import EmailDetails from "./components/Home/EmailDetails";
import SentEmailDetails from "./components/Home/SentEmailDetails";
import TrashEmailDetails from "./components/Home/TrashEmailDetails";
import Inbox from "./components/Home/Inbox";
import Sentbox from "./components/Home/Sentbox";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Header from "./components/Header/Header";
import NavigationSideBar from "./components/Home/Navigation";
import TrashBox from "./components/Home/Trash";
import useEmailService from "./components/Mail/useEmailService";
import { mailActions } from "./store/mail-slice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchInboxMails, fetchSentboxMails, fetchTrashBoxMails } =
    useEmailService();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  const [inboxEmailContent, setInboxEmailContent] = useState({});
  const [sentEmailContent, setSentEmailContent] = useState({});
  const [trashEmailContent, setTrashEmailContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, notification]);

  const handleSidebarOptionClick = async (option) => {
    if (option === "Inbox") {
      // await fetchInbox();
      navigate("/inbox");
    } else if (option === "Sent") {
      // await fetchSentbox();
      navigate("/sent");
    } else if (option === "Trash") {
      // await fetchTrashBox();
      navigate("/trash");
    }
  };
  const fetchInbox = useCallback(async () => {
    const data = await fetchInboxMails();
    setInboxEmailContent(data);
    dispatch(mailActions.storeInboxMail(data));
    // console.log(data)
  }, [fetchInboxMails, dispatch]);

  const fetchSentbox = useCallback(async () => {
    const data = await fetchSentboxMails();
    setSentEmailContent(data);
    dispatch(mailActions.storeSentMail(data));
    console.log(data)
  }, [fetchSentboxMails, dispatch]);

  const fetchTrashBox = useCallback(async () => {
    const data = await fetchTrashBoxMails();
    setTrashEmailContent(data);
    dispatch(mailActions.storeTrashMail(data));
  }, [fetchTrashBoxMails, dispatch]);

  useEffect(() => {
    if (isLoggedIn && loading) {
      fetchInbox();
      fetchSentbox();
      fetchTrashBox();
      setLoading(false);
    }
  }, [fetchInbox, fetchSentbox, fetchTrashBox, loading, isLoggedIn]);

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      {isLoggedIn && <Header />}
      <div className={isLoggedIn ? "app-container" : ""}>
        <div>
          {isLoggedIn && (
            <NavigationSideBar
              onOptionClick={handleSidebarOptionClick}
              setSentEmailContent={setSentEmailContent}
            />
          )}
        </div>
        <div className={isLoggedIn ? "content" : ""}>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Navigate to="/inbox" />} />
                <Route
                  path="/inbox"
                  element={
                    <Inbox
                      emailContent={inboxEmailContent}
                      setEmailContent={setInboxEmailContent}
                      setTrashEmailContent={setTrashEmailContent}
                      fetchInbox={fetchInbox}
                      loading={loading}
                    />
                  }
                />
                <Route
                  path="/sent"
                  element={
                    <Sentbox
                      emailContent={sentEmailContent}
                      setEmailContent={setSentEmailContent}
                      setTrashEmailContent={setTrashEmailContent}
                      loading={loading}
                    />
                  }
                />
                <Route
                  path="/trash"
                  element={
                    <TrashBox
                      emailContent={trashEmailContent}
                      setEmailContent={setTrashEmailContent}
                      loading={loading}
                    />
                  }
                />
                <Route
                  path="/inbox/:emailKey"
                  element={<EmailDetails onClick={handleGoback} />}
                />
                <Route
                  path="/sent/:emailKey"
                  element={<SentEmailDetails onClick={handleGoback} />}
                />
                <Route
                  path="/trash/:emailKey"
                  element={<TrashEmailDetails onClick={handleGoback} />}
                />
                <Route path="*" element={<Navigate to="/inbox" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginForm />} />
                <Route
                  path="/login/forgotPassword"
                  element={<ForgotPassword />}
                />
                <Route path="/signUp" element={<SignupForm />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
