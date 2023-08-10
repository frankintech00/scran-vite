import { render, screen } from "@testing-library/react";
import Header from "../../../components/sandbox/Header";

describe("Header", () => {
  it("renders headline", () => {
    render(<Header />);
    const headline = screen.getByText(/It works!/i);
    expect(headline).toBeInTheDocument();
  });

  it("renders h1 element", () => {
    render(<Header />);
    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toBeInTheDocument();
  });

  it("does not render incorrect text", () => {
    render(<Header />);
    const incorrectText = screen.queryByText(/Incorrect text!/i);
    expect(incorrectText).not.toBeInTheDocument();
  });
});
