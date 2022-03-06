import React from "react";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

import __Component__ from "./__Component__";

describe("__Component__ should work as expected", () => {
  it("should render without crashing", () => {
    expect(render(<__Component__ />)).toBeTruthy();
  });

  it("should not pass", () => {
    expect(true).toBe(false);
  });
});