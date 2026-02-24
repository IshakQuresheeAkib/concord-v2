import type { PageProps } from '@/types/next'

export default async function CheckoutPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout — Biodata #{id}</h1>
    </div>
  )
}
