import ErrorBoundary from ".";

import { renderWithRouter } from "~/utils/tests";
import { getError } from "~/utils/functions";

describe("<ErrorBoundary />", () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  it("should match the snapshot", () => {
    const { container } = renderWithRouter(<ErrorBoundary error="error" />);

    expect(console.error).toBeCalledWith(getError("unexpected"), "error");

    expect(container).toMatchSnapshot();
  });
});
