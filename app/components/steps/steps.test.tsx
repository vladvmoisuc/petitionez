import { render, screen } from "@testing-library/react";

import Steps from ".";

import { renderWithUser } from "~/utils/tests";
import { getText } from "~/utils/functions";

const props = {
  steps: [
    {
      title: "Step 1",
      content: "Step 1 content",
      entities: [
        {
          email: "entity1@gmail.com",
          url: "www.entity1.com",
        },
      ],
    },
    {
      title: "Step 2",
      content: "Step 2 content",
      entities: [
        {
          email: "entity2@gmail.com",
          url: "www.entity2.com",
        },
      ],
    },
  ],
  user: {
    name: "John Doe",
    address: "john@doe.com",
  },
  isMobile: false,
  children: <span>Mobile only content</span>,
  onError: jest.fn(),
};

describe("<Steps />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Steps {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when mobile content is rendered", () => {
    const { container } = render(<Steps {...props} isMobile />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with an alert when the flow is continued without filling the user details ", async () => {
    const { user, container } = renderWithUser(
      <Steps {...props} user={{ name: "", address: "" }} />
    );

    await user.click(screen.getByText(getText("buttons.next")));

    expect(props.onError).toBeCalledWith(true);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with an alert when the flow is continued without filling the user details", async () => {
    const { user, container } = renderWithUser(
      <Steps {...props} user={{ name: "", address: "" }} />
    );

    await user.click(screen.getByText(getText("buttons.next")));

    expect(props.onError).toBeCalledWith(true);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the last step is active", async () => {
    const { user, container } = renderWithUser(<Steps {...props} />);

    await user.click(screen.getAllByText(getText("buttons.next"))[0]);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the flow is finished", async () => {
    const { user, container } = renderWithUser(<Steps {...props} />);

    await user.click(screen.getAllByText(getText("buttons.next"))[0]);
    await user.click(screen.getAllByText(getText("buttons.back"))[0]);
    await user.click(screen.getAllByText(getText("buttons.next"))[0]);
    await user.click(screen.getAllByText(getText("buttons.next"))[1]);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when text is coppied to the clipboard", async () => {
    const writeTextSpy = jest.spyOn(navigator.clipboard, "writeText");

    const { user, container } = renderWithUser(<Steps {...props} />);

    await user.click(screen.getAllByText(getText("buttons.next"))[0]);
    await user.click(screen.getAllByText(getText("buttons.next"))[1]);

    await user.click(screen.getByText(getText("buttons.copy")));

    expect(writeTextSpy).toBeCalledWith("http://localhost/");

    expect(container).toMatchSnapshot();
  });
});
