// server/roles.js
import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

export const roles = (function () {
  ac.grant("clerk").readOwn("profile").updateOwn("profile");

  ac.grant("judge").readOwn("profile").updateOwn("profile");

  // ac.grant("admin")
  //  .extend("basic")
  //  .extend("supervisor")
  //  .updateAny("profile")
  //  .deleteAny("profile")

  return ac;
})();
export default roles;
