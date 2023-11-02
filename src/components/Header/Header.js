import React from "react";
import styles from "./Header.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");

    navigate("/login");
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
