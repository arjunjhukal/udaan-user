import { useState } from "react";
import { EmptyList } from "../../../../molecules/EmptyList";
import TabController from "../../../../molecules/TabController";

export default function AllLiveClassList() {
  const tabs = [
    { value: "live_class", label: "Live Class" },
    { value: "upcoming", label: "Upcoming Classes" },
  ];
  const [activeTab, setActiveTab] = useState("live_class");
  return (
    <div className="all__live__class__lisiting">
      <TabController
        options={tabs}
        setActiveTab={(newValue) => {
          setActiveTab(newValue);
        }}
        currentActive={activeTab}
      />
      <EmptyList
        title="No Live Classes"
        description="There are no live classes available at the moment."
      />
    </div>
  );
}
