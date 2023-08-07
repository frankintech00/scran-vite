import { sum } from "../components/Sum";

describe("sum function", () => {
  it("adds two numbers correctly", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("returns concatenated if one is a string", () => {
    expect(sum(2, "3")).toBe("23");
  });
});
