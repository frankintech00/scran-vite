import { render, screen } from "@testing-library/react";
import ErrorMessage from "../../../components/common/ErrorMessage";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("ErrorMessage component", () => {
  it("renders the error message when there is an error in the UserContext", () => {
    const errorMessage = "An error occurred";
    render(
      <MockUserProvider error={errorMessage}>
        <ErrorMessage />
      </MockUserProvider>
    );
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
  it("does not render the error message when there is no error in the UserContext", () => {
    render(
      <MockUserProvider value={{ error: null }}>
        <ErrorMessage />
      </MockUserProvider>
    );
    const errorElement = screen.queryByText(/.+/);
    expect(errorElement).toBeNull();
  });
});
