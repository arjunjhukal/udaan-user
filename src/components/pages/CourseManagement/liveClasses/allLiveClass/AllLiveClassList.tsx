import { useEffect, useState } from "react";
import type { LiveClassProps } from "../../../../../types/liveClass";
import TablePagination from "../../../../molecules/Pagination";
import LiveClassCard from "../../../../organism/Cards/LiveClassCard";
import PageHeader from "../../../../organism/PageHeader";
import TableFilter from "../../../../organism/TableFilter";


const liveClass: LiveClassProps[] = [{
  id: 1,
  name: "Test 1",
  duration: {
    hours: 1,
    minutes: 30,
  },
  teacher: "Prof. Saugat Maharjan",
  description: "This is a test description",
  start_datetime: "2023-08-01T10:00:00Z",
  end_datetime: "2023-08-01T12:00:00Z",
  activeStudents: 10,
},
{
  id: 2,
  name: "Test 2",
  duration: {
    hours: 1,
    minutes: 30,
  },
  teacher: "Prof. Saugat Maharjan",
  description: "This is a test description",
  start_datetime: "2023-08-01T10:00:00Z",
  end_datetime: "2023-08-01T12:00:00Z",
  activeStudents: 10,
},
{
  id: 3,
  name: "Test 3",
  duration: {
    hours: 1,
    minutes: 30,
  },
  teacher: "Prof. Saugat Maharjan",
  description: "This is a test description",
  start_datetime: "2023-08-01T10:00:00Z",
  end_datetime: "2023-08-01T12:00:00Z",
  activeStudents: 10,
}
]

export default function AllLiveClassList() {
  const [testData, setTestData] = useState(liveClass);
  const [search, setSearch] = useState<string>("");
  const [qp, setQp] = useState({
    pageIndex: 1,
    pageSize: 8,
  });

  // const [activeTab, setActiveTab] = useState("Ongoing Classes");

  // const menuItems = [
  //   "Ongoing Classes",
  //   "Upcoming Classes",
  //   "Post Classes"
  // ];

  useEffect(() => {
    const filteredData = liveClass.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setTestData(filteredData);
  }, [search]);

  const onFilter = () => { };

  return (
    <>
      <PageHeader
        breadcrumb={[
          {
            title: "Live Classes",
          },
        ]}
      />
      <TableFilter search={search} setSearch={setSearch} onFilter={onFilter} />
      <div className="flex gap-6">
        {/* <TabSelector activeTab={activeTab} onChange={setActiveTab} items={menuItems} /> */}
        {/* <Divider orientation="vertical" flexItem /> */}
        {
          // activeTab === "Ongoing Classes"  (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {testData.map((test, index) => (
              <LiveClassCard key={index} data={test} />
            ))}
          </div>
          // ) : activeTab === "Upcoming Classes" ? (
          //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          //     {testData.map((test, index) => (
          //       <UpcomingClassCard key={index} data={test} />
          //     ))}
          //   </div>
          // ) : (
          //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
          //     {testData.map((test, index) => (
          //       <PastClassCard key={index} aya={test} />
          //     ))}
          //   </div>
          // )
        }
      </div>

      <TablePagination qp={qp} setQp={setQp} totalPages={10} />
    </>
  );
}
