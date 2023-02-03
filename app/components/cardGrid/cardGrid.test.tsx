import CardGrid from ".";

import { renderWithRouter } from "~/utils/tests";

import { SLUGS } from "~/utils/constants";

const props = {
  elements: [
    {
      id: "1",
      href: "/card",
      slug: "test",
      image: "www.image.ro/1",
      title: "Card",
      createdAt: new Date("10/10/2000"),
      description: "Testing the card",
    },
    {
      id: "2",
      href: "/card",
      slug: "test",
      image: "www.image.ro/1",
      title: "Card 2",
      createdAt: new Date("10/10/2000"),
      description: "Testing the card",
    },
  ],
  defaultElement: {
    href: "/card",
    slug: SLUGS.CREATE,
    image: "",
    title: "Create card",
    createdAt: "",
    description: "Creating a card",
  },
  href: "/campaigns",
};

describe("<Card />", () => {
  it("should match the snapshot", () => {
    const { container } = renderWithRouter(
      <CardGrid {...props} defaultElement={undefined} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the default element is set", () => {
    const { container } = renderWithRouter(<CardGrid {...props} />);

    expect(container).toMatchSnapshot();
  });

  it(`should match the snapshot when the slug redirect is false`, () => {
    const { container } = renderWithRouter(
      <CardGrid {...props} slugRedirect={false} />
    );

    expect(container).toMatchSnapshot();
  });
});
