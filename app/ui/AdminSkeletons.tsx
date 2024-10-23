const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function AccountCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg`}
    >
      <div className="border p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
        </div>
      </div>
    </div>
  );
}

export function AccountListSkeleton() {
  return (
    <div className="container mx-auto my-4">
      <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
      <div className="grid grid-cols-1 gap-4">
        <AccountCardSkeleton />
        <AccountCardSkeleton />
        <AccountCardSkeleton />
      </div>
    </div>
  );
}