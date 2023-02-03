import { render, screen } from "@testing-library/react";

import CopyAdornment from ".";

import { renderWithUser } from "~/utils/tests";

const callback = jest.fn();

const props = {
  text: "Test",
  onCopy: jest.fn(() => callback),
};

describe("<CopyAdornment />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<CopyAdornment {...props} />);

    expect(props.onCopy).toBeCalledWith(props.text);

    expect(container).toMatchSnapshot();
  });

  it("should call the callback when the button is clicked", async () => {
    const { user } = renderWithUser(<CopyAdornment {...props} />);

    expect(props.onCopy).toBeCalledWith(props.text);

    await user.click(screen.getByRole("button"));

    expect(callback).toBeCalled();
  });
});
