import {
  Box,
  Button,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { FilterSquare, SearchNormal } from "iconsax-reactjs";

export type LayoutProps = "table" | "grid";
interface TableFilterProps {
  search: string;
  setSearch: (newValue: string) => void;
  onFilter?: () => void;
}
export default function TableFilter({
  search,
  setSearch,
  onFilter,
}: TableFilterProps) {
  const theme = useTheme();

  return (
    <Box className={`md:grid md:grid-cols-12  items-center mb-8 `}>
      <div className="col-span-6">
        <OutlinedInput
          placeholder="Search"
          name="search"
          id="search"
          startAdornment={<SearchNormal size={20} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            gap: "8px",
            "&": {
              padding: "10px 16px",
            },
          }}
        />
      </div>
      <div className="col-span-6">
        <div className="flex justify-end items-center gap-3 filter__right">
          {onFilter ? (
            <Button
              startIcon={
                <FilterSquare
                  size={24}
                  variant="Bold"
                  color={theme.palette.text.dark}
                />
              }
              sx={{
                border: `1px solid ${theme.palette.seperator.dark}`,
              }}
              className="py-2.5! px-3.5! rounded-md!"
            >
              <Typography
                variant="textBase"
                color="text.dark"
                textTransform={"capitalize"}
              >
                Filter
              </Typography>
            </Button>
          ) : null}
        </div>
      </div>
    </Box>
  );
}
