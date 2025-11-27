import { Box, Typography } from "@mui/material";
interface Props {
    image: string;
    title: string;
    description: string;
}
export const EmptyList = ({ image, title, description }: Props) => {
    return (
        <Box className="flex items-center justify-center p-13">
            <Box className="flex flex-col items-center">
                <img src={image || "/empty-list-placeholder.svg"} alt="" className="h-[115px] w-[149px] object-contain" />
                <Typography variant="text2Xl" fontWeight={600} color="brand.main" mt={1}>{title}</Typography>
                <Typography variant="textBase" fontWeight={400} color="text.middle" mt={"2px"}>{description}</Typography>
            </Box>
        </Box>
    )
}
