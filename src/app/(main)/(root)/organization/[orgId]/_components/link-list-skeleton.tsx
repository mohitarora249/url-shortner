import { Skeleton } from "~/components/ui/skeleton";

const LinkListSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2 p-4 pt-0">
      {Array(10)
        .fill(0)
        .map((_, idx) => (
          <Skeleton key={idx} className="h-14" />
        ))}
    </div>
  );
};

export default LinkListSkeleton;
