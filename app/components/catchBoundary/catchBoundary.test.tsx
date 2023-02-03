import CatchBoundary from ".";

import { renderWithRouter } from "~/utils/tests";

describe("<CatchBoundary />", () => {
  it("should match the snapshot", () => {
    const { container } = renderWithRouter(<CatchBoundary />);

    expect(container).toMatchSnapshot();
  });
});
