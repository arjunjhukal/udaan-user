import { Box, Button, Typography } from "@mui/material";

interface Props {
    image?: string;
    title: string;
    description: string;
    cta?: {
        label: string;
        url?: string;
    };
    onClick?: () => void;
}

export const EmptyList = ({ image, title, description, cta, onClick }: Props) => {
    return (
        <Box className="flex items-center justify-center p-13">
            <Box className="flex flex-col items-center">
                <img
                    src={image || "/empty-list-placeholder.svg"}
                    alt=""
                    className="h-[115px] w-[149px] object-contain"
                />

                <Typography variant="h4" fontWeight={600} color="brand.main" mt={1}>
                    {title}
                </Typography>

                <Typography variant="subtitle1" fontWeight={400} color="text.middle" mt={"2px"}>
                    {description}
                </Typography>

                {cta ? (
                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-5!"
                        {...(onClick
                            ? { onClick }
                            : { component: "a", href: cta.url || "#" })}
                    >
                        {cta.label}
                    </Button>
                ) : null}
            </Box>
        </Box>
    );
};
