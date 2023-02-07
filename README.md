# Welcome to petitionez!

- [Live Website](purple-sky-3754.fly.dev)

## Description

**petitionez** is a simple tool for creating petitiones templates, which purpose is to help user that want to inform different entities about their requirements. Instead of:
- thinking about headlines
- writing descriptions
- searching for government entities emails

users can just:
- open the application
- pick a petition
- fill in their name and address
- open their mail client with a pre-filled template

##  Users can:

#### Regular users:
- See the list of campaigns
- Search for a campaign and select it
- See a single campaign
 - See the templates in a journey format (a campaign can have multiple templates)
- Fill their details and the templates will be updated in real-time with the information
- Open the template in their mail client, ready for delivery
- Copy template parts one by one

#### Editors:

- Everything that **regular users** can do
- Log into the application using their email address and an OTP code sent on their email
- View their campaigns
- Edit an active campaign
- Delete an active campaign
- Create a new campaign

#### Admins:

- Everything that **editors** can do
- Edit / Delete all the campaigns


## Technologies:

- Remix
- React
- Typescript
- Postgres / SQLite with Prisma
- Material UI

## DX

- Components can be created using the CLI based on a template stored in the `app/templates/[*]component`
- - Database can be seeded using the script from `prisma/seed.ts`
- Unit tests are run on remote using CircleCI
- **pre-commit** and **pre-push** hooks will run `prettier`, `eslint` and `unit tests`
- 


## Development

Before anything else, you should make the set-up for the database. By default, you can add environment variables for using a remote Postgres database, but you can locally change the Prisma config to use SQLite.

#### Postgres:

```sh
# create a .env file
touch .env

# add the environment variables
DATABASE_URL = ''
SHADOW_DATABASE_URL = ''
```
https://supabase.com/docs/guides/integrations/prisma


#### SQLite:

```sh
# open prisma/schema.prisma	
vim prisma/schema.prisma

# change provider to "sqlite"
# remove shadowDatabaseUrl

# push the db changes
npx prisma db push

# seed the database with fake data
npm run seed
```



### Run the application:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

### Run the application with a clean state:

```sh
npm run dev:clean
```

This cleans your db and re-runs the seed command before starting the app.

## Deployment

Do the set-up for [fly.io](https://fly.io/docs/hands-on/install-flyctl/) and run:

```sh
fly deploy
```

## Create a component:

You can run`npm run create:component` to make a new component using one of the templates from `app/templates/[*]component`. You'll be guided in the CLI to enter a name and to choose if you want a stylesheet or not.
