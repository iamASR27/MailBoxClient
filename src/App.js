import React from "react";
import SignupForm from "./components/Login/SignUp";
import LoginForm from "./components/Login/Login";
import Notification from "./components/UI/Notification";
import ForgotPassword from "./components/Login/ForgotPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Mail/Home";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  return (
    <>
    {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signUp" element={<SignupForm />} />
        {isLoggedIn && <Route path="/home" element={<Home />} />}
      </Routes>
    </>
  );
}

export default App;
