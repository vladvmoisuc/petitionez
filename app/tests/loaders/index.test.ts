/**
 * @jest-environment node
 */

import { redirect } from "@remix-run/node";

import { loader } from "~/routes/index";

import { ROUTES } from "~/utils/constants";

jest.mock("@remix-run/node");

describe("loader", () => {
  it(`should redirect to ${ROUTES.CAMPAIGNS}`, async () => {
    await loader();

    expect(redirect).toBeCalledWith(ROUTES.CAMPAIGNS);
  });
});
