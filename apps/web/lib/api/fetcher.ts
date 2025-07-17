type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface FetchOptions {
  method?: HttpMethod
  body?: Record<string, any>
  headers?: HeadersInit
  credentials?: RequestCredentials
}

export async function apiFetch<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
  } = options

  const res = await fetch(url, {
    method,
    credentials,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.error || res.statusText || "API request failed")
  }

  return res.json()
}
