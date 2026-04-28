export default function LearnLoading() {
  return (
    <div className="py-16 container-app animate-pulse">
      <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-20"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="h-64 bg-gray-100 rounded-2xl"></div>
        <div className="h-64 bg-gray-100 rounded-2xl"></div>
      </div>
    </div>
  )
}
