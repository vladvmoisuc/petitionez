import { render } from "@testing-library/react";

import Component from ".";

describe("<Component />", () => {
  it("should render", () => {
    const { container } = render(<Component></Component>);

    expect(container).toMatchSnapshot();
  });
});
