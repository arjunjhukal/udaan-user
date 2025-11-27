import { Button } from "@mui/material";

interface TabSelectorProps {
    items: string[];
    activeTab: string;
    onChange: (item: string) => void;
}

const TabSelector = ({
    items,
    activeTab,
    onChange
}: TabSelectorProps) => {
    return (
        <div className="flex flex-col min-w-1/6">
            {items?.map((item) => (
                <Button
                    key={item}
                    variant={activeTab === item ? "contained" : "text"}
                    size="small"
                    onClick={() => onChange(item)}
                >
                    {item}
                </Button>
            ))}
        </div>
    )
}

export default TabSelector