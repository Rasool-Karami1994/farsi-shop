import http from "./httpService";

export const signupUser = (user) => {
  return http.post("/user/register", user);
};
