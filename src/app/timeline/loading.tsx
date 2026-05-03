export default function TimelineLoading() {
  return (
    <div className="py-16 container-app animate-pulse">
      <div className="h-10 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    </div>
  )
}
