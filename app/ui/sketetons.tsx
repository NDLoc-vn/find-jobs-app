const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function JobCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-4 mb-4 shadow-sm`}
    >
      <div className="ml-2 h-6 w-48 rounded-md bg-gray-200 text-sm font-medium" />
      <div className="mt-2 ml-2 h-5 w-24 rounded-md bg-gray-200 text-sm font-medium" />
      <div className="ml-2 mt-2 h-5 w-24 rounded-md bg-gray-200" />
      <div className="ml-2 mt-2 h-5 w-32 rounded-md bg-gray-200" />
    </div>
  );
}

export function JobListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
    </div>
  );
}