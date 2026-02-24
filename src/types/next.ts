// Shared Next.js page prop types

export type PageProps<TParams extends Record<string, string> = Record<string, string>> = {
  params: Promise<TParams>
  searchParams?: Promise<Record<string, string | string[]>>
}
