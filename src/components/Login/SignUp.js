import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import styles from "./SignUp.module.css";

function SignupForm() {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alertPassword, setAlertPassword] = useState(null);

  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    // console.log(name, value)
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredEmail = signUpForm.email;
    const enteredPassword = signUpForm.password;
    const confirmEnteredPassword = signUpForm.confirmPassword;

    if (enteredPassword !== confirmEnteredPassword) {
      setAlertPassword(<Alert variant="danger">Password and confirm password do not match</Alert>);
    }

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnwPnXJjlw_tBrWF8ui454lPHJ0090gw4";

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
        console.log("User has successfully signed up.");
        // localStorage.setItem("token", data.idToken);
        // localStorage.setItem("userId", data.localId);
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
      alert(err.message);
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
            <h2 data-testid="signup-header">Sign Up</h2>
            {alertPassword}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className={styles.customInput}>
                <FloatingLabel controlId="email" label="Email">
                  <Form.Control
                    type="email"
                    id="email"
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
                    id="password"
                    name="password"
                    onChange={inputChangeHandler}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                controlId="confirmPassword"
                className={styles.customInput}
              >
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                >
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={inputChangeHandler}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            <div className={styles.toggle}>
              <Button
                type="submit"
                variant="primary"
                // block="true"
                className={styles.customButton}
                data-testid="signup-button"
              >
                Sign Up
              </Button>
              <p className="text-center mt-3">
              Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
            </p>
            </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;
