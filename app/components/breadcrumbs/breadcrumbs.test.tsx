import { renderWithRouter } from "~/utils/tests";

const useLocationMock = jest.fn();

jest.mock("@remix-run/react", () => ({
  useLocation: useLocationMock,
  Link: ({ children, ...props }: { children: any }) => (
    <a {...props}>{children}</a>
  ),
}));

// eslint-disable-next-line import/first
import Breadcrumbs from ".";

describe("<Breadcrumbs />", () => {
  it("should match the snapshot", () => {
    useLocationMock.mockReturnValue({
      pathname: "/campaigns",
    });

    const { container } = renderWithRouter(<Breadcrumbs />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the pathname is nested", () => {
    useLocationMock.mockReturnValue({
      pathname: "/campaigns/a-cool-campaign",
    });

    const { container } = renderWithRouter(<Breadcrumbs />);

    expect(container).toMatchSnapshot();
  });
});
