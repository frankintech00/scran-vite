import React from "react";
import { render, screen } from "@testing-library/react";
import ReadRecipeCreatorInfo from "../../../components/recipe/ReadRecipeCreatorInfo";

describe("ReadRecipeCreatorInfo component", () => {
  it("renders the creator info correctly", () => {
    const photoURL = "https://example.com/profile.jpg";
    const displayName = "John Doe";
    const createdAt = {
      toDate: vitest.fn(() => new Date("2023-08-01T12:34:56Z")),
    };

    render(
      <ReadRecipeCreatorInfo
        photoURL={photoURL}
        displayName={displayName}
        createdAt={createdAt}
      />
    );

    const profileImage = screen.getByAltText("User profile");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", photoURL);

    const displayNameElement = screen.getByText(displayName);
    expect(displayNameElement).toBeInTheDocument();

    const publishedDateElement = screen.getByText(
      "Published: Tue Aug 1 2023 1:34 PM"
    );
    expect(publishedDateElement).toBeInTheDocument();
  });
});
