import { render, screen } from "@testing-library/react";
import LoadMore from "./LoadMore";

describe("<LoadMore />", () => {
  it("should not have class active", () => {
    render(<LoadMore loading={false} onClick={() => {}} />);

    expect(screen.getByRole("button")).not.toHaveClass("active");
  });

  it("should have class active", () => {
    render(<LoadMore loading={true} onClick={() => {}} />);

    expect(screen.getByRole("button")).toHaveClass("active");
  });
});
