import Breadcrumbs from ".";

import { renderWithRouter } from "~/utils/tests";

describe("<Breadcrumbs />", () => {
  beforeAll(() => {
    Object.defineProperty(window, "location", {
      value: {},
    });
  });

  it("should match the snapshot", () => {
    window.location.pathname = "/campaigns";

    const { container } = renderWithRouter(<Breadcrumbs />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the pathname is nested", () => {
    window.location.pathname = "/campaigns/a-cool-campaign";

    const { container } = renderWithRouter(<Breadcrumbs />);

    expect(container).toMatchSnapshot();
  });
});
