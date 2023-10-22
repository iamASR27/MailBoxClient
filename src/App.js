import React from 'react';
import SignupForm from './components/Login/SignUp';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<SignupForm />} />
   </Routes>
   </>
  );
}

export default App;
