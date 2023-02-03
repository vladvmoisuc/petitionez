import { render, screen } from "@testing-library/react";

import UserDetails from ".";

import { getText } from "~/utils/functions";
import { renderWithUser } from "~/utils/tests";

const props = {
  isMobile: false,
  error: false,
  user: {
    name: "John",
    address: "Sesame Street",
  },
  onChange: jest.fn(),
};

describe("<UserDetails />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<UserDetails {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with mobile content", () => {
    const { container } = render(<UserDetails {...props} isMobile />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with errors", () => {
    const { container } = render(
      <UserDetails {...props} error user={{ name: "", address: "" }} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the onChange prop when filling the fields", async () => {
    const { user } = renderWithUser(
      <UserDetails {...props} user={{ name: "", address: "" }} />
    );

    await user.type(
      screen.getByLabelText(getText("campain.user.form.fields.name")),
      "F"
    );

    await user.type(
      screen.getByLabelText(getText("campain.user.form.fields.address")),
      "N"
    );

    expect(props.onChange).toBeCalledTimes(2);
  });
});
