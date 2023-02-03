import Card from ".";

import { renderWithRouter } from "~/utils/tests";

import { SLUGS } from "~/utils/constants";

const baseProps = {
  id: "1",
  href: "/card",
  slug: "test",
};

const props = {
  ...baseProps,
  image: "www.image.ro/1",
  title: "Card",
  createdAt: new Date("10/10/2000"),
  description: "Testing the card",
};

describe("<Card />", () => {
  it("should match the snapshot", () => {
    const { container } = renderWithRouter(<Card {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the slug redirect is false", () => {
    const { container } = renderWithRouter(
      <Card {...baseProps} slugRedirect={false} />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should match the snapshot when the slug is ${SLUGS.CREATE}`, () => {
    const { container } = renderWithRouter(
      <Card {...baseProps} slug={SLUGS.CREATE} slugRedirect={false} />
    );

    expect(container).toMatchSnapshot();
  });
});
