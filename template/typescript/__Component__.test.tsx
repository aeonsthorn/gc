import React from "react";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

import Component from ".";

describe("${titleCased} should work as expected", () => {
  it("should render without crashing", () => {
    expect(render(<Component />)).toBeTruthy();
  });

  it("this is your first failing test. Start by making it work", () => {
    const { getAllByText } = render(<Component />);
    expect(getAllByText(/Component/)).toBeFalsy();
  });
});
