import React, { useEffect, useState, useCallback } from "react";
import SignupForm from "./components/Login/SignUp";
import LoginForm from "./components/Login/Login";
import Notification from "./components/UI/Notification";
import ForgotPassword from "./components/Login/ForgotPassword";
// import EmailDetails from "./components/Home/EmailDetails";
import Home from "./components/Home/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ComposeEmail from "./components/Mail/ComposeEmail";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Header from "./components/Header/Header";
import NavigationSideBar from "./components/Home/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import { fetchInboxMails } from "./components/Mail/EmailService";
import EmailDetails from "./components/Home/EmailDetails";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    fetchInbox();
    // console.log(emailContent)
  }, [fetchInbox]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      {isLoggedIn && (
        <div>
          <Header />
          <Container fluid className="fix-container">
            <Row>
              <Col sm={3} className="navigation-column">
                <NavigationSideBar onOptionClick={handleSidebarOptionClick} />
              </Col>
              <Col sm={9} className="main-column">
                <Routes>
                  {selectedEmail === null && isLoggedIn && (
                    <Route
                      path="/home"
                      element={
                        <Home
                          emailContent={emailContent}
                          setSelectedEmail={setSelectedEmail}
                          fetchInbox={fetchInbox}
                        />
                      }
                    />
                  )}
                  {selectedEmail && isLoggedIn && (
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
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route
                    path="/login/forgotPassword"
                    element={<ForgotPassword />}
                  />
                  <Route path="/signUp" element={<SignupForm />} />
                  {isLoggedIn && (
                    <Route path="/composeEmail" element={<ComposeEmail />} />
                  )}
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {/* <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signUp" element={<SignupForm />} />
        {isLoggedIn && (
          <Route path="/composeEmail" element={<ComposeEmail />} />
        )} */}
      {/* {selectedEmail === null && isLoggedIn && (
          <Route
            path="/home"
            element={
              <Home
                emailContent={emailContent}
                setSelectedEmail={setSelectedEmail}
                fetchInbox={fetchInbox}
              />
            }
          />
        )}
        {selectedEmail && isLoggedIn && (
          <Route
            path="/home/:emailKey"
            element={
              <EmailDetails
                onClick={handleGoback}
                selectedEmail={selectedEmail}
              />
            }
          />
        )} */}
      {/* </Routes> */}
    </>
  );
}

export default App;
