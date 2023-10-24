import React from "react";
import { render, screen } from "@testing-library/react";
import SignupForm from "../components/Login/SignUp";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


describe("renders SignUpForm Component", () => {
  test("renders text", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    const signupFormHeaderElement = screen.getByTestId("signup-header");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signupButton = screen.getByTestId("signup-button");
    const loginLink = screen.getByText("Login");

    expect(signupFormHeaderElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test("submits the form with valid data", () => {
    // window.fetch = jest.fn()
    // window.fetch.mockResolvedValueOnce({
    //   ok: true,
    //   json: async () => ({
    //     idToken: "yourMockToken",
    //     localId: "yourMockUserId",
    //   }),
    // });

    // const consoleLogSpy = jest.spyOn(window.console, "log");
    // consoleLogSpy.mockImplementation(() => {});

    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signupButton = screen.getByTestId("signup-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.type(confirmPasswordInput, "password");

    userEvent.click(signupButton);

    // expect(consoleLogSpy).toHaveBeenCalledWith(
    //   "User has successfully signed up."
    // );

    // consoleLogSpy.mockRestore();
    // await waitFor(() => {
    //     expect(window.location.pathname).toBe('/home');
    //   });
    // });
    
        // const homeText = await screen.findByText("Home");
        // expect(homeText).toBeInTheDocument();
     
    });
});
