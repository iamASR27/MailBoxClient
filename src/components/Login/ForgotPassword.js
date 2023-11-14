import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import LoadingSpinner from "../Spinner/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error sending password reset link: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${styles.forgotPassword} container`}>
      <Form onSubmit={handleForgotPassword}>
        <Form.Group>
          <Form.Label>Enter the email with which you have registered</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" disabled={loading} className="mt-3">
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            "Send Link"
          )}
        </Button>
      </Form>
    </section>
  );
};

export default ForgotPassword;
