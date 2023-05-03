export const selectUserAuth = (state) => state.auth;
export const selectAuthUserName = (state) => state.auth?.user?.name;
export const selectAuthUser = (state) => state.auth?.user;