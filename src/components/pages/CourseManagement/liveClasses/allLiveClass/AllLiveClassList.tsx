import { useState } from "react";
import { useGetAllLiveClassesQuery } from "../../../../../services/liveApi";
import { EmptyList } from "../../../../molecules/EmptyList";
import TablePagination from "../../../../molecules/Pagination";
import TabController from "../../../../molecules/TabController";
import LiveClassCard from "../../../../organism/Cards/LiveClassCard";

type Status = "ongoing" | "upcoming";

export default function AllLiveClassList() {
  const tabs = [
    { value: "ongoing", label: "Ongoing Classes" },
    { value: "upcoming", label: "Upcoming Classes" },
  ];

  const [qp, setQp] = useState({ pageIndex: 1, pageSize: 10 });
  const [activeTab, setActiveTab] = useState<Status>("ongoing");

  const { data, isLoading, isFetching } = useGetAllLiveClassesQuery({
    ...qp,
    type: activeTab,
  });

  const liveClasses = data?.data?.data ?? [];
  const totalPages = data?.data?.pagination?.total_pages ?? 0;

  const isEmpty = !isLoading && liveClasses.length === 0;
  const isLoadingState = isLoading || isFetching;

  return (
    <div className="all__live__class__lisiting">
      {/* Tabs */}
      <TabController
        options={tabs}
        currentActive={activeTab}
        setActiveTab={(newValue) => {
          setActiveTab(newValue as Status);
          setQp((prev) => ({ ...prev, pageIndex: 1 }));
        }}
      />

      {isLoadingState && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[220px] rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {isEmpty && (
        <EmptyList
          title="No Live Classes"
          description="There are no live classes available at the moment."
        />
      )}

      {!isLoadingState && liveClasses.length > 0 && (
        <div className="flex flex-col gap-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveClasses.map((liveClass) => (
              <LiveClassCard key={liveClass.id} data={liveClass} />
            ))}
          </div>

          {totalPages > 1 && (
            <TablePagination
              qp={qp}
              setQp={setQp}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
}
