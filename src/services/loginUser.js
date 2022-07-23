import http from "./httpService";

export const loginUser = (user) => {
  return http.post("/user/login", user);
};
