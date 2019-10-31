import createCtx from "./createCtx";

const userFromStorage = localStorage.getItem("MELOSYNC_USER");
let user = null;

try {
  if (userFromStorage !== null) {
    user = JSON.parse(userFromStorage);
  }
} catch (error) {
  user = null;
}
const [ctx, UserProvider] = createCtx(user);
export const UserContext = ctx;

export default UserProvider;
