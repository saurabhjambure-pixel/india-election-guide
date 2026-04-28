export default function FlowLoading() {
  return (
    <div className="pb-40 container-app animate-pulse pt-10">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-12"></div>
      <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-20"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
        <aside className="lg:col-span-4 space-y-16">
          <div className="h-24 bg-gray-100 rounded-2xl"></div>
        </aside>
      </div>
    </div>
  )
}
