import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MockUserProvider from "../../MockUserProvider";
import SignIn from "../../../components/user/SignIn";

test("signs in with a mock username and password", async () => {
  const mockEmail = "test@example.com";
  let user = null;
  let isLoggedIn = false;

  // Mock signIn function
  const mockSignIn = async (email, password) => {
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Set user and isLoggedIn
    user = { email: mockEmail };
    isLoggedIn = true;

    return { user };
  };

  // Define mock values for the context
  const mockContextValue = {
    user: null,
    isLoggedIn: false,
    signIn: mockSignIn,
    error: null,
    loading: false,
  };

  // Render the component within the MemoryRouter and mock context provider
  render(
    <MemoryRouter>
      <MockUserProvider value={mockContextValue}>
        <SignIn />
      </MockUserProvider>
    </MemoryRouter>
  );

  // Simulate user input
  fireEvent.input(screen.getByPlaceholderText("Email Address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.input(screen.getByPlaceholderText("Password"), {
    target: { value: "password" },
  });

  // Simulate clicking the sign-in button
  fireEvent.click(screen.getByText("Sign In."));

  // Wait for the asynchronous operation to complete
  await waitFor(() => {
    expect(isLoggedIn).toBe(true);
    expect(user.email).toBe(mockEmail);
  });
});
