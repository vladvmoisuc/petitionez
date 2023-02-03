import { render } from "@testing-library/react";

import Footer, { links } from ".";

describe("<Footer />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});

describe("links", () => {
  it("should return the list of stylesheets", () => {
    expect(links()).toEqual([{ href: {}, rel: "stylesheet" }]);
  });
});
