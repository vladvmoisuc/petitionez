import { screen } from "@testing-library/react";

import EntityForm from ".";

import { getText } from "~/utils/functions";
import { renderWithRouter } from "~/utils/tests";

describe("<EntityForm />", () => {
  it("should match the snapshot", () => {
    const { container } = renderWithRouter(<EntityForm />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when loading", () => {
    const { container } = renderWithRouter(<EntityForm loading />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshots after filling the fields", async () => {
    const { user, container } = renderWithRouter(<EntityForm />);

    await user.type(
      screen.getByLabelText(getText("entity.form.fields.email")),
      "john@gmail.com"
    );

    await user.type(
      screen.getByLabelText(getText("entity.form.fields.url")),
      "https://www.petitionez.ro"
    );

    expect(container).toMatchSnapshot();
  });
});
