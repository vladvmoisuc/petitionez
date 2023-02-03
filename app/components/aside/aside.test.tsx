import { render } from "@testing-library/react";

import Aside from ".";

describe("<Aside />", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <Aside>
        <span>Test...</span>
      </Aside>
    );

    expect(container).toMatchSnapshot();
  });
});
