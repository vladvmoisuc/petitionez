/**
 * @jest-environment node
 */

import { loader } from "~/routes/campaigns";

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
      orderBy: { title: "asc" },
      select: { slug: true, title: true },
    });

    expect(data).toEqual({ title: "Test" });
  });
});
