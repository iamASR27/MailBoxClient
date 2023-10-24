import React from "react";
import SignupForm from "./components/Login/SignUp";
import LoginForm from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // const navigate = useNavigate();

  // if (!isLoggedIn) {
  //   navigate('/login');
  // }

  return (
    <>
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
