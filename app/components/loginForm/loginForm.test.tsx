import { screen } from "@testing-library/react";

import LoginForm from ".";

import { renderWithRouter } from "~/utils/tests";
import { getText } from "~/utils/functions";

import { LOGIN_STATES } from "~/utils/constants";

const props = {
  code: "",
  email: "",
  handleCodeChange: jest.fn(),
  handleEmailChange: jest.fn(),
};

describe("<LoginForm />", () => {
  it("should match the snapshot", () => {
    const { container } = renderWithRouter(<LoginForm {...props} />);

    expect(container).toMatchSnapshot();
  });

  it(`should match the snapshot when the type is set to ${LOGIN_STATES.ERROR}`, () => {
    const { container } = renderWithRouter(
      <LoginForm
        {...props}
        type={LOGIN_STATES.ERROR as keyof typeof LOGIN_STATES}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should match the snapshot when the type is set to ${LOGIN_STATES.NEW}`, () => {
    const { container } = renderWithRouter(
      <LoginForm
        {...props}
        type={LOGIN_STATES.NEW as keyof typeof LOGIN_STATES}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should match the snapshot when the type is set to ${LOGIN_STATES.OLD}`, () => {
    const { container } = renderWithRouter(
      <LoginForm
        {...props}
        type={LOGIN_STATES.OLD as keyof typeof LOGIN_STATES}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should call the handleCodeChange prop when the code is changed`, async () => {
    const { container, user } = renderWithRouter(
      <LoginForm
        {...props}
        type={LOGIN_STATES.NEW as keyof typeof LOGIN_STATES}
      />
    );

    await user.type(screen.getByLabelText(getText("login.fields.code")), "1");

    expect(props.handleCodeChange).toBeCalled();

    expect(container).toMatchSnapshot();
  });

  it(`should call the handleEmailChange prop when the email is changed`, async () => {
    const { container, user } = renderWithRouter(<LoginForm {...props} />);

    await user.type(
      screen.getByPlaceholderText(getText("login.fields.email")),
      "j"
    );

    expect(props.handleEmailChange).toBeCalled();

    expect(container).toMatchSnapshot();
  });
});
