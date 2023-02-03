import { render } from "@testing-library/react";

import Search, { links } from ".";

const options = [{ title: "Test", slug: "test" }];

describe("<Search />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Search options={options} />);

    expect(container).toMatchSnapshot();
  });
});

describe("links", () => {
  it("should return the list of stylesheets", () => {
    expect(links()).toEqual([{ href: {}, rel: "stylesheet" }]);
  });
});
