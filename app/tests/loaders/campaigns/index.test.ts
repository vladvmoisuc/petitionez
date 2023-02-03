/**
 * @jest-environment node
 */

import { loader } from "~/routes/campaigns/index";

import { db } from "~/utils/db.server";

jest.mock("@remix-run/node", () => ({
  json: jest.fn().mockReturnValue({ title: "Test" }),
}));
jest.mock("~/utils/db.server", () => ({
  db: {
    campaign: {
      findMany: jest.fn().mockResolvedValue({ data: {} }),
    },
  },
}));

describe("loader", () => {
  it("should return a JSON", async () => {
    const data = await loader();

    expect(db.campaign.findMany).toBeCalledWith({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        slug: true,
      },
    });

    expect(data).toEqual({ title: "Test" });
  });
});
