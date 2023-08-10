import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../../../components/sandbox/Form";

describe("Form", () => {
  it("renders exactly two input text boxes", () => {
    render(<Form />);
    const textInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    expect(textInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders exactly two buttons", () => {
    render(<Form />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3); // 2 buttons + 1 submit button
  });

  it("renders form with input fields", () => {
    render(<Form />);
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  it("renders form with input fields", () => {
    render(<Form />);
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  it("renders buttons", () => {
    render(<Form />);
    expect(screen.getByText(/Button 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Button 2/i)).toBeInTheDocument();
  });

  it("handles button click events", () => {
    const alertSpy = vitest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Form />);

    fireEvent.click(screen.getByText(/Button 1/i));
    expect(alertSpy).toHaveBeenCalledWith("Button 1 clicked!");

    fireEvent.click(screen.getByText(/Button 2/i));
    expect(alertSpy).toHaveBeenCalledWith("Button 2 clicked!");

    alertSpy.mockRestore();
  });

  it("handles form submission", () => {
    const alertSpy = vitest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Form />);

    fireEvent.submit(screen.getByText(/Submit/i));
    expect(alertSpy).toHaveBeenCalledWith("Form submitted!");

    alertSpy.mockRestore();
  });
});
