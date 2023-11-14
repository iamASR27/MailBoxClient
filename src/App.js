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
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Header from "./components/Header/Header";
import NavigationSideBar from "./components/Home/Navigation";
import TrashBox from "./components/Home/Trash";
import {
  fetchInboxMails,
  fetchSentboxMails,
  fetchTrashBoxMails,
} from "./components/Mail/EmailService";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  const [emailContent, setEmailContent] = useState({});
  // const [selectedEmail, setSelectedEmail] = useState(null);
 

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
      await fetchInbox();
      navigate("/inbox");
    } else if (option === "Sent") {
      await fetchSentbox();
      navigate("/sent");
    } else if (option === "Trash") {
      await fetchTrashBox();
      navigate("/trash");
    }
  };
  const fetchInbox = useCallback(async () => {
    const data = await fetchInboxMails();
    setEmailContent(data);
  }, []);

  const fetchSentbox = useCallback(async () => {
    const data = await fetchSentboxMails();
    setEmailContent(data);
  }, []);

  const fetchTrashBox = async () => {
    const data = await fetchTrashBoxMails();
    setEmailContent(data);
  };

  const handleGoback = () => {
    // setSelectedEmail(null);
    // if (location.pathname.includes("inbox")) {
    //   navigate("/inbox");
    // } else if (location.pathname.includes("sent")){
    //   navigate("/sent");
    // } else {
    //   navigate("/trash");
    // }
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
              fetchInbox={fetchInbox}
              fetchSentbox={fetchSentbox}
            />
          )}
        </div>
        <div className={isLoggedIn ? "content" : ""}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/login/forgotPassword" element={<ForgotPassword />} />
            <Route path="/signUp" element={<SignupForm />} />

            {isLoggedIn && (
              <Route
                path="/inbox"
                element={
                  <Inbox
                    emailContent={emailContent}
                    fetchInbox={fetchInbox}
                  />
                }
              />
            )}
            {isLoggedIn && (
              <Route
                path="/sent"
                element={
                  <Sentbox
                    emailContent={emailContent}
                    fetchSentbox={fetchSentbox}
                  />
                }
              />
            )}
            {isLoggedIn && (
              <Route
                path="/trash"
                element={
                  <TrashBox
                    emailContent={emailContent}
                    fetchTrashBox={fetchTrashBox}
                  />
                }
              />
            )}

            {isLoggedIn && (
              <Route
                path="/inbox/:emailKey"
                element={<EmailDetails onClick={handleGoback} />}
              />
            )}
            {isLoggedIn && (
              <Route
                path="/sent/:emailKey"
                element={
                  <SentEmailDetails
                    onClick={handleGoback}
                  />
                }
              />
            )}
            {isLoggedIn && (
              <Route
                path="/trash/:emailKey"
                element={
                  <TrashEmailDetails
                    onClick={handleGoback}
                  />
                }
              />
            )}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
