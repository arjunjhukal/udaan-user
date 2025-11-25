// import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../../organism/PageHeader";
import AllTestLists from "./AllTestList";
import TableFilter from "../../../../organism/TableFilter";
import Paginations from "../../../../molecules/Paginations";
// import PageHeader from "../../../../organism/PageHeader";
// import QuizManagementFrom from "../QuizManagementFrom";

export default function AllTests() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [qp, setQp] = useState({
    pageIndex: 1,
    pageSize: 8,
  });

  return (
    <>
      <PageHeader
        breadcrumb={[
          {
            title: "Test",
          },
        ]}
      />
      {/* <TableFilter search={search} setSearch={setSearch} /> */}

      <AllTestLists />
      <Paginations qp={qp} setQp={setQp} totalPages={10} />
      {/* <QuizManagementFrom open={open} setOpen={setOpen} /> */}
    </>
  );
}
