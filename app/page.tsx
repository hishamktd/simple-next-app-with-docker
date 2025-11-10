export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Next.js with Docker
        </h1>
        <p className="text-xl text-gray-600">
          This is a simple Next.js application running in a Docker container.
        </p>
        <div className="mt-8 p-6 bg-blue-100 rounded-lg">
          <p className="text-lg">
            Edit <code className="bg-gray-800 text-white px-2 py-1 rounded">app/page.tsx</code> to get started.
          </p>
        </div>
      </div>
    </main>
  )
}
