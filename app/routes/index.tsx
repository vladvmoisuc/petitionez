import { redirect } from "@remix-run/node";

import { ROUTES } from "~/utils/constants";

export const loader = async () => {
  return redirect(ROUTES.CAMPAIGNS);
};
