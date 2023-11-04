import React, { useEffect, useState, useCallback } from "react";
import SignupForm from "./components/Login/SignUp";
import LoginForm from "./components/Login/Login";
import Notification from "./components/UI/Notification";
import ForgotPassword from "./components/Login/ForgotPassword";
import EmailDetails from "./components/Home/EmailDetails";
import Home from "./components/Home/Home";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
// import ComposeEmail from "./components/Mail/ComposeEmail";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Header from "./components/Header/Header";
import NavigationSideBar from "./components/Home/Navigation";
// import { Container, Row, Col } from "react-bootstrap";
import { fetchInboxMails } from "./components/Mail/EmailService";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  const [emailContent, setEmailContent] = useState({});
  const [selectedEmail, setSelectedEmail] = useState(null);

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

  const handleSidebarOptionClick = (option) => {
    if (option === "Inbox") {
      fetchInbox();
    } else if (option === "Sent") {
      // fetchSentBox();
    }
  };
  const fetchInbox = useCallback(async () => {
    const data = await fetchInboxMails();
    console.log(data);
    setEmailContent(data || {});
  }, []);


  const handleGoback = () => {
    setSelectedEmail(null);
    navigate("/home");
  };

  useEffect(() => {
    const emailKey = location.pathname.split("/home/")[1];
    console.log(emailKey)
    // fetchInbox();
    if (emailKey) {
      const emailData = emailContent[emailKey];
      console.log(emailData)
      if (emailData) {
        setSelectedEmail(emailData);
      } else {
        setSelectedEmail(null);
      }
    }
  }, [location, emailContent, fetchInbox]);


  

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
          <NavigationSideBar onOptionClick={handleSidebarOptionClick} />
      )}
      </div>
      <div className={isLoggedIn ? "content" : ""}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signUp" element={<SignupForm />} />

        {isLoggedIn && selectedEmail === null && (
          <Route
            path="/home"
            element={
              <Home
                emailContent={emailContent}
                fetchInbox={fetchInbox}
                setSelectedEmail={setSelectedEmail}
              />
            }
          />
        )}
        {/* {console.log(isLoggedIn)}
        {console.log(selectedEmail)} */}
        {isLoggedIn && selectedEmail && (
          <Route
            path="/home/:emailKey"
            element={
              <EmailDetails
                onClick={handleGoback}
                selectedEmail={selectedEmail}
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
