import { Box, Button, Typography } from "@mui/material"

export const EmptyList = () => {
    return (
        <Box className="flex items-center justify-center p-13">
            <Box className="flex flex-col items-center">
                <img src="/empty-list-placeholder.svg" alt="" className="h-[115px] w-[149px] object-contain" />
                <Typography variant="text2Xl" fontWeight={600} color="brand.main" mt={1}>No data found</Typography>
                <Typography variant="textBase" fontWeight={400} color="text.middle" mt={"2px"}>We’ll get back to you as soon as possible.</Typography>
                <Button variant="contained" color="primary" sx={{ backgroundColor: "brand.main", mt: 2, fontSize: "18px", fontWeight: 600, p: "16px 24px" }} >View Downloaded Audios</Button>
            </Box>
        </Box>
    )
}
