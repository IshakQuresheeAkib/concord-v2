// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Concord v2 - Next.js + TypeScript
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Modern matrimonial platform
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            ✅ Next.js 14 Setup Complete
          </p>
          <p className="text-sm text-gray-500">
            ✅ TypeScript Configured
          </p>
          <p className="text-sm text-gray-500">
            ✅ Tailwind CSS Ready
          </p>
          <p className="text-sm text-gray-500">
            ✅ Backend Connected: {process.env.NEXT_PUBLIC_API_URL}
          </p>
        </div>
      </div>
    </main>
  )
}