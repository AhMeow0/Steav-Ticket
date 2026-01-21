type ApiBase = string

const rawBase = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000/api'
const base: ApiBase = rawBase.replace(/\/+$/, '')

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}
