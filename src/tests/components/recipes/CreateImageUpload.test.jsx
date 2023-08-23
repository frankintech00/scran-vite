import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CreateImageUpload from "../../../components/recipe/CreateImageUpload";

describe("CreateImageUpload component", () => {
  it("renders the CreateImageUpload component", () => {
    render(
      <BrowserRouter>
        <CreateImageUpload />
      </BrowserRouter>
    );

    const fileInput = screen.getByRole("file-input", { type: "file" });
    expect(fileInput).toBeInTheDocument();

    fireEvent.click(fileInput);
  });
});
