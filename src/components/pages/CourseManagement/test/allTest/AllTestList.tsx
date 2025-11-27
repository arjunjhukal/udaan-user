import { useEffect, useState } from "react";
import Paginations from "../../../../molecules/Paginations";
import PageHeader from "../../../../organism/PageHeader";
import TableFilter from "../../../../organism/TableFilter";
import TestCard from "../../../../organism/Cards/TestCard";
import type { TestProps } from "../../../../../types";

const test: TestProps[] = [
  {
    id: 1,
    name: "Test 1",
    duration: {
      hours: 1,
      minutes: 30,
    },
    description: "This is a test description",
    full_marks: 100,
    pass_marks: 80,
    start_datetime: "2023-08-01T10:00:00Z",
    end_datetime: "2023-08-01T12:00:00Z",
    course_ids: [1, 2],
    question_ids: [1, 2, 3],
  },
  {
    id: 2,
    name: "Test 2",
    duration: {
      hours: 2,
      minutes: 0,
    },
    description: "This is another test description",
    full_marks: 150,
    pass_marks: 120,
    start_datetime: "2023-08-02T14:00:00Z",
    end_datetime: "2023-08-02T16:00:00Z",
    course_ids: [1, 2],
    question_ids: [4, 5, 6],
  },
  {
    id: 3,
    name: "Test 3",
    duration: {
      hours: 1,
      minutes: 45,
    },
    description: "This is yet another test description",
    full_marks: 200,
    pass_marks: 180,
    start_datetime: "2023-08-03T09:00:00Z",
    end_datetime: "2023-08-03T11:00:00Z",
    course_ids: [1, 2],
    question_ids: [7, 8, 9],
  },
  {
    id: 4,
    name: "Test 4",
    duration: {
      hours: 1,
      minutes: 30,
    },
    description: "This is a test description",
    full_marks: 100,
    pass_marks: 80,
    start_datetime: "2023-08-01T10:00:00Z",
    end_datetime: "2023-08-01T12:00:00Z",
    course_ids: [1, 2],
    question_ids: [1, 2, 3],
  },
];

export default function AllTestLists() {
  const [testData, setTestData] = useState(test);
  const [search, setSearch] = useState<string>("");
  const [qp, setQp] = useState({
    pageIndex: 1,
    pageSize: 8,
  });

  useEffect(() => {
    const filteredData = test.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setTestData(filteredData);
  }, [search]);

  const onFilter = () => {};

  return (
    <>
      <PageHeader
        breadcrumb={[
          {
            title: "Test",
          },
        ]}
      />
      <TableFilter search={search} setSearch={setSearch} onFilter={onFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testData.map((test, index) => (
          <TestCard key={index} test={test} />
        ))}
      </div>
      <Paginations qp={qp} setQp={setQp} totalPages={10} />
    </>
  );
}
