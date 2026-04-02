function SkeletonItem() {
  return (
    <div>
      <div className="flex items-center py-[15px] px-4 animate-pulse">
        <div className="w-12 h-[68px] bg-gray rounded shrink-0" />
        <div className="flex items-baseline w-[480px] ml-12 gap-4">
          <div className="h-[18px] w-[200px] bg-gray rounded shrink-0" />
          <div className="h-[14px] w-[80px] bg-gray rounded" />
        </div>
        <div className="h-[18px] w-[100px] bg-gray rounded ml-[22px] shrink-0" />
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <div className="h-[46px] w-[108px] bg-gray rounded-lg" />
          <div className="h-[46px] w-[100px] bg-gray rounded-lg" />
        </div>
      </div>
      <div className="border-b border-[#D2D6DA]" />
    </div>
  );
}

export default function BookListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonItem key={i} />
      ))}
    </div>
  );
}
