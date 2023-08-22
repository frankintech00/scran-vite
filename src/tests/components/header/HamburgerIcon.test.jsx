import { render, screen } from "@testing-library/react";
import HamburgerIcon from "../../../components/header/HamburgerIcon";

describe("HamburgerIcon", () => {
  test("renders HamburgerIcon component", () => {
    render(<HamburgerIcon />);
    const hamburgerIcon = screen.getByTestId("hamburgerIcon");
    expect(hamburgerIcon).toBeInTheDocument();
  });

  test("Renders the SVG element", () => {
    render(<HamburgerIcon />);

    const svgElement = screen.getByTestId("svgElement");
    expect(svgElement).toBeInTheDocument();
  });
});
