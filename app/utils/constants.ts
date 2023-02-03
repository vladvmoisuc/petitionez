export const DATE_FORMATS = {
  STANDARD: "D/MM/YYYY",
};

export const ROUTES = {
  MANAGEMENT: "/management",
  CAMPAIGNS: "/campaigns",
  LOGIN: "/login",
};

export const EMAIL_TYPES = {
  NEW: "new",
  OLD: "old",
};

export const LOGIN_STATES = {
  ...EMAIL_TYPES,
  DEFAULT: "default",
  ERROR: "error",
};

export const INTENTS = {
  VALIDATE: "validate",
  GENERATE: "generate",
  DELETE: {
    CAMPAIGN: "delete-campaign",
  },
  UPDATE: {
    CAMPAIGN: "update-campaign",
  },
  CREATE: {
    ENTITY: "create-entity",
    CAMPAIGN: "create-campaign",
  },
};

export const SLUGS = {
  CREATE: "create",
};

export const LINKS = {
  POSTIMAGES: {
    URL: "https://postimages.org/",
    NAME: "postimages.org",
  },
};
