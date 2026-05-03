interface SkeletonLoaderProps {
  lines?: number
}

export default function SkeletonLoader({ lines = 3 }: SkeletonLoaderProps) {
  return (
    <div className="skeleton-loader">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-line" />
      ))}
    </div>
  )
}
