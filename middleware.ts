export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // we protect all our routes
    "/trips",
    "/reservations",
    "/properties",
    "/favorites",
  ],
};
