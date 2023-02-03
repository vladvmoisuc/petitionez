import { createCookieSessionStorage } from "@remix-run/node";

const HOUR = 1 * 60 * 60; // second -> minute -> hour

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: HOUR,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.COOKIES_SECRET_KEY as string],
      secure: true,
    },
  });

async function getLoggedUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const loggedUserEmail: string = session.get("email") ?? "";
  const loggedUserId: string = session.get("id") ?? "";
  const isAdmin: boolean = session.get("admin") ?? false;

  return { loggedUserEmail, loggedUserId, isAdmin };
}

export { getSession, commitSession, destroySession, getLoggedUser };
