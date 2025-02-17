export function url(path = '') {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'http://localhost:3000'

  return new URL(path, baseUrl)
}
