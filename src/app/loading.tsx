export default function Loading() {
  return (
    <div className="py-20 container-app animate-pulse">
      <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    </div>
  )
}
