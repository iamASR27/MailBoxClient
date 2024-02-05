import React from "react";
import styles from "./Header.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userId");
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("activeOption");
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/login");
    // resetState();
  };

  return (
    <header className={styles.header}>
      <h1>MailBox</h1>
      <Button type="button" onClick={handleLogout} variant="light">
        Logout
      </Button>
    </header>
  );
};

export default Header;
