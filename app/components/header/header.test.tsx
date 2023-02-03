import Header from ".";

import { renderWithRouter } from "~/utils/tests";

describe("<Header />", () => {
  it("should match the snapshot", () => {
    const { container } = renderWithRouter(<Header />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the children is set", () => {
    const { container } = renderWithRouter(
      <Header className="Header">
        <span />
      </Header>
    );

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with the search bar", () => {
    const { container } = renderWithRouter(
      <Header options={[{ title: "Test", slug: "test" }]} />
    );

    expect(container).toMatchSnapshot();
  });
});
