import { apiFetch } from "./fetcher"

//TODO:change the url to routes
export function loginUser(email: string, password: string) {
  return apiFetch("http://localhost:3001/auth/login", {
    method: "POST",
    body: { email, password },
  })
}

export function logoutUser() {
  return apiFetch("http://localhost:3001/auth/logout", {
    method: "POST",
  })
}

export function registerUser(email: string, password: string, name: string) {
  return apiFetch("http://localhost:3001/auth/register", {
    method: "POST",
    body: { email, password, name },
  })
}
