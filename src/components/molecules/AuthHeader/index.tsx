import { Typography } from "@mui/material";

export default function AuthHeader({ title, description }: { title?: string; description?: string }) {
    if (!title && !description) {
        return
    }
    return (
        <div className="mb-8">
            {title ? <Typography variant="textXl" className="mb-1.5! font-medium">{title} </Typography > : ""}
            {description ? <Typography variant="textSm" color="text.secondary" >{description}</Typography> : ""}
        </div>
    )
}
