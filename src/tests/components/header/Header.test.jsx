import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../../components/header/Header";
import MockRecipeProvider from "../../mockContexts/MockRecipeProvider";
import MockUserProvider from "../../mockContexts/MockUserProvider";

describe("Header component", () => {
  it("renders the Header component", () => {
    const isLoggedIn = false;
    render(
      <BrowserRouter>
        <MockUserProvider isLoggedIn={isLoggedIn}>
          <MockRecipeProvider>
            <Header />
          </MockRecipeProvider>
        </MockUserProvider>
      </BrowserRouter>
    );

    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeInTheDocument();

    const navMenuElement = screen.getByTestId("navMenu");
    expect(navMenuElement).toBeInTheDocument();
    expect(navMenuElement.classList.contains("hidden")).toBe(true);

    const searchInputElement = screen.getByTestId("searchInput");
    expect(searchInputElement).toBeInTheDocument();

    const signInDropdownElement = screen.getByTestId("signInDropdown");
    expect(signInDropdownElement).toBeInTheDocument();
  });
  it("renders the Header component", () => {
    const isLoggedIn = true;
    const user = {
      username: "testUser",
      email: "email@test.com",
      photoURL: "https://test.com/test.png",
    };
    render(
      <BrowserRouter>
        <MockUserProvider isLoggedIn={isLoggedIn} user={user}>
          <MockRecipeProvider>
            <Header />
          </MockRecipeProvider>
        </MockUserProvider>
      </BrowserRouter>
    );

    const avatarDropdownElement = screen.getByTestId("avatarDropdown");
    expect(avatarDropdownElement).toBeInTheDocument();
  });
});
