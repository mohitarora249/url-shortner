import { Skeleton } from "~/components/ui/skeleton";

const OrganizationListSkeleton = () => {
  return (
    <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <Skeleton key={idx} className="h-14" />
        ))}
    </div>
  );
};

export default OrganizationListSkeleton;
