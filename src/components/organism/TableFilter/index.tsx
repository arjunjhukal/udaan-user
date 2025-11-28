import { Box, Button, IconButton, OutlinedInput, Stack, Typography, useTheme } from "@mui/material";
import { Filter, SearchNormal } from "iconsax-reactjs";
import type { Dispatch, SetStateAction } from "react";

export type LayoutProps = "table" | "grid"
interface TableFilterProps {
  search: string;
  setSearch: (newValue: string) => void;

  onFilter?: () => void;
  layout?: LayoutProps
  setLayout?: Dispatch<SetStateAction<LayoutProps>>;
  categoryLayout?: boolean;
  title?: string;
}
export default function TableFilter({ search, setSearch, onFilter, layout, categoryLayout, title, setLayout }: TableFilterProps) {
  const theme = useTheme();


  return (
    <Box className={`md:grid md:grid-cols-12  items-center mb-8 ${categoryLayout ? "pb-2 mb-6" : ""}`}
      sx={{
        borderBottom: categoryLayout ? `1px solid ${theme.palette.seperator.dark}` : ""
      }}
    >
      <div className="col-span-6">
        {!categoryLayout ? <OutlinedInput
          placeholder="Search"
          name="search"
          id="search"
          startAdornment={<SearchNormal size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            gap: "8px"
          }}
        /> : <Typography variant="textLg" fontWeight={500} color="text.dark">{title}</Typography>}

      </div>
      <div className="col-span-6">
        <div className="flex justify-end items-center gap-3 filter__right">


          {categoryLayout ? <OutlinedInput
            placeholder="Search"
            name="search"
            id="search"
            startAdornment={<SearchNormal size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              gap: "8px",
              padding: "8px 16px"
            }}
          /> : ""}
          {onFilter ? <Button startIcon={<Filter size={16} />} sx={{
            border: `1px solid ${theme.palette.seperator.dark}`
          }} className="py-2.5! px-3.5! rounded-md!">
            <Typography variant="textSm" color="text.dark">Filter</Typography>
          </Button> : ""}
          {layout ? <Stack >
            <IconButton sx={{
              border: `1px solid ${theme.palette.seperator.dark}`,
              borderRadius: "8px 0 0 8px",
            }} className={`py-2.5! px-3.5! ${layout === "table" ? "active__layout" : ""}`}
              onClick={() => setLayout && setLayout("table")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7.74995H9.75V1.94995H16.19C19.83 1.94995 22 4.11995 22 7.74995Z" fill="#9CA3B0" />
                <path d="M22 16.25C21.95 19.82 19.79 21.95 16.19 21.95H9.75V16.25H22Z" fill="#9CA3B0" />
                <path d="M8.25 1.94995V21.95H7.81C4.17 21.95 2 19.78 2 16.14V7.75995C2 4.11995 4.17 1.94995 7.81 1.94995H8.25Z" fill="#9CA3B0" />
                <path d="M22 9.25H9.75V14.75H22V9.25Z" fill="#9CA3B0" />
              </svg>
            </IconButton>
            <IconButton sx={{
              border: `1px solid ${theme.palette.seperator.dark}`,
              borderRadius: "0 8px 8px 0",
            }} className={`py-2.5! px-3.5! ${layout === "grid" ? "active__layout" : ""}`}
              onClick={() => setLayout && setLayout("grid")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" stroke="#9CA3B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" stroke="#9CA3B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" stroke="#9CA3B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" stroke="#9CA3B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </IconButton>
          </Stack> : ""}
        </div>
      </div>
    </Box>
  )
}
