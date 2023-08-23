import React from "react";
import { render, screen } from "@testing-library/react";
import SocialShareButtons from "../../../components/recipe/SocialShareButtons";

describe("SocialShareButtons component", () => {
  const recipeName = "Delicious Recipe";
  const location = { pathname: "/recipe/123" };

  it("renders the social share buttons and print button", () => {
    render(<SocialShareButtons recipeName={recipeName} location={location} />);

    const facebookShareButton = screen.getByRole("button", {
      name: /facebook/i,
    });
    expect(facebookShareButton).toBeInTheDocument();

    const twitterShareButton = screen.getByRole("button", {
      name: /twitter/i,
    });
    expect(twitterShareButton).toBeInTheDocument();

    const whatsappShareButton = screen.getByRole("button", {
      name: /whatsapp/i,
    });
    expect(whatsappShareButton).toBeInTheDocument();

    const emailShareButton = screen.getByRole("button", {
      name: /email/i,
    });
    expect(emailShareButton).toBeInTheDocument();

    const printButton = screen.getByTestId("printButton");
    expect(printButton).toBeInTheDocument();
  });
});
