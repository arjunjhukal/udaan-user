import PageHeader from "../../../../organism/PageHeader";
import AllLiveClassList from "./AllLiveClassList";

export default function AllLiveClass() {
  return (
    <>
      <PageHeader
        breadcrumb={[{
          title: "Live Classes"
        }]}
      />
      <AllLiveClassList />
    </>
  );
}
