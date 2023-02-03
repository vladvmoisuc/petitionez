import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

import { getText } from "~/utils/functions";

const db = new PrismaClient();

function createTemplate() {
  return {
    title: faker.lorem.sentence(),
    content: getText("templates.campaigns"),
    entities: {
      create: [
        {
          email: faker.internet.email(),
          url: faker.internet.url(),
        },
        {
          email: faker.internet.email(),
          url: faker.internet.url(),
        },
      ],
    },
  };
}

function createCampaign() {
  const templates = [];

  for (let i = 0; i < Math.random() * 10; i++) {
    templates.push(createTemplate());
  }

  return {
    title: faker.company.catchPhrase(),
    description: faker.lorem.lines(3),
    slug: faker.internet.domainWord(),
    image: faker.image.avatar(),
    templates: {
      create: templates,
    },
    author: {
      create: {
        email: faker.internet.email(),
        name: faker.name.fullName(),
      },
    },
  };
}

async function seed() {
  console.log("Seeding the database...");

  try {
    for (let i = 0; i < 20; i++) {
      await db.campaign.create({ data: createCampaign() });
    }

    console.log("Seed finished succesfully.");
  } catch (error) {
    console.log(`Seeding error: ${error}`);
  }
}

seed();
