import { render } from "@testing-library/react";
import Logo from "../../../components/common/Logo";

describe("Logo component", () => {
  it("renders the logo image", () => {
    render(<Logo className="logo" />);

    const logoImage = document.querySelector(".logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/src/assets/logo.png");
    expect(logoImage).toHaveAttribute("alt", "Scarn logo");
  });
});
