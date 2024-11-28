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

export function JobDetailSkeleton() {
  return (
    <div className="container mx-auto p-6 bg-white max-w-5xl animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="rounded bg-gray-300 p-5 w-10 h-10"></div>
          <div className="bg-gray-300 h-10 w-32 rounded"></div>
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-36 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        </div>

        {/* Right side */}
        <div className="p-4">
          <div className="flex justify-between space-x-4 mb-4">
            <div className="bg-gray-300 h-24 w-full rounded"></div>
            <div className="bg-gray-300 h-24 w-full rounded"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-36 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48 mt-4 mb-2"></div>
          <div className="flex space-x-4">
            <div className="bg-gray-300 h-10 w-32 rounded"></div>
            <div className="bg-gray-300 h-10 w-10 rounded"></div>
            <div className="bg-gray-300 h-10 w-10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-pulse">
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
          <div className="flex flex-col mt-2">
            <div className="h-8 bg-gray-300 rounded w-48 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-4"></div>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-bold border-b-2">Học vấn</h3>
        <div className="h-4 bg-gray-300 rounded w-48 my-4"></div>
      </div>
      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-bold border-b-2">Kĩ năng</h3>
        <div className="h-4 bg-gray-300 rounded w-48 my-4"></div>
      </div>
      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-bold border-b-2">Kinh nghiệm làm việc</h3>
        <div className="h-4 bg-gray-300 rounded w-48 my-4"></div>
      </div>
      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-bold border-b-2">Hồ sơ xin việc</h3>
        <div className="h-4 bg-gray-300 rounded w-48 my-4"></div>
      </div>
    </div>
  );
}