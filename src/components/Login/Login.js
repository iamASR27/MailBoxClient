import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import styles from "./SignUp.module.css";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [alertPassword, setAlertPassword] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const showAlert = (message, variant) => {
    setAlertPassword(<Alert variant={variant}>{message}</Alert>);
    
    setTimeout(() => {
      setAlertPassword(null);
    }, 3000);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    // console.log(name, value)
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const enteredEmail = loginForm.email;
    const enteredPassword = loginForm.password;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnwPnXJjlw_tBrWF8ui454lPHJ0090gw4";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("User has successfully logged in.");
        dispatch(authActions.login({ token: data.idToken, userEmail: enteredEmail }));
        localStorage.setItem("token", data.idToken);
        // localStorage.setItem("userId", data.localId);
        localStorage.setItem("userEmail", enteredEmail);
        navigate("/home");
      } else {
        const data = await response.json();
        let errorMessage = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      showAlert(err.message, "danger");
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className={styles.full}>
        <Col xs={12} md={6} className={styles.leftHalf}>
          <div>
            <h2>MailBox</h2>
            <h2>Client</h2>
            <h2>Project</h2>
          </div>
        </Col>
        <Col xs={12} md={6} className={styles.rightHalf}>
          <div>
            <h2>Login</h2>
            {alertPassword}

            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="email" className={styles.customInput}>
                <FloatingLabel controlId="email" label="Email">
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={inputChangeHandler}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId="password" className={styles.customInput}>
                <FloatingLabel controlId="password" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={inputChangeHandler}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Link to="/login/forgotPassword" className={styles.loginLink}>
                Forgot Password?
              </Link>

              <div className={styles.toggle}>
                <Button
                  type="submit"
                  variant="primary"
                  // block="true"
                  className={styles.customButton}
                >
                  Login
                </Button>
                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <Link to="/signUp" className={styles.loginLink}>
                    SignUp
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
