import React from 'react';
import SignupForm from './components/Login/SignUp';
import LoginForm from './components/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signUp" element={<SignupForm />} />
   </Routes>
   </>
  );
}

export default App;
