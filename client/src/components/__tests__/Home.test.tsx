import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home Component", () => {
  it("renders home heading", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders welcome text", () => {
    render(<Home />);
    expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
  });
});
