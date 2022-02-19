import React from "react";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

import __Component__ from ".";

describe("__Component__ should work as expected", () => {
  it("should render without crashing", () => {
    expect(render(<__Component__ />)).toBeTruthy();
  });

  it("this is your first failing test. Start by making it work", () => {
    const { getAllByText } = render(<__Component__ />);
    expect(getAllByText(/__Component__/)).toBeFalsy();
  });
});
