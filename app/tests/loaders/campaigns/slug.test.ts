/**
 * @jest-environment node
 */
import invariant from "tiny-invariant";

import { loader } from "~/routes/campaigns/$slug";

import { db } from "~/utils/db.server";

import { getError } from "~/utils/functions";

import type { LoaderArgs } from "@remix-run/node";

jest.mock("@remix-run/node", () => ({
  json: jest.fn().mockReturnValue({ title: "Test" }),
}));
jest.mock("~/utils/db.server", () => ({
  db: {
    campaign: {
      findUnique: jest.fn().mockResolvedValue({ data: {} }),
    },
  },
}));

describe("loader", () => {
  it("should throw an error when no slug is used", async () => {
    try {
      invariant(false, getError("slug-expected"));
    } catch (error) {
      await expect(loader({ params: {} } as LoaderArgs)).rejects.toEqual(error);
    }
  });

  it("should return a JSON", async () => {
    const data = await loader({
      params: { slug: "test" },
    } as unknown as LoaderArgs);

    expect(db.campaign.findUnique).toBeCalledWith({
      select: {
        author: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        description: true,
        templates: {
          select: {
            content: true,
            entities: {
              select: {
                email: true,
                url: true,
              },
            },
            title: true,
          },
        },
        title: true,
      },
      where: {
        slug: "test",
      },
    });

    expect(data).toEqual({
      title: "Test",
    });
  });
});
