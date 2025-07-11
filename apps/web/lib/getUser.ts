import { cookies } from "next/headers"

export async function getUserFromToken() {
  const token = cookies().get("token")?.value
  if (!token) return null

  const res = await fetch("http://localhost:3001/auth/me", {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) return null
  return await res.json()
}
