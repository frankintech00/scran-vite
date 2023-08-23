import React from "react";
import { render, screen } from "@testing-library/react";
import ReadRecipeNotes from "../../../components/recipe/ReadRecipeNotes";

describe("ReadRecipeNotes component", () => {
  it("renders the notes correctly", () => {
    const notes = "These are some recipe notes.";

    render(<ReadRecipeNotes notes={notes} />);

    const notesTitle = screen.getByText("Notes:");
    expect(notesTitle).toBeInTheDocument();

    const notesElement = screen.getByText(notes);
    expect(notesElement).toBeInTheDocument();
  });
});
