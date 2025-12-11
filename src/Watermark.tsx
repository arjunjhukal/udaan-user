import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "./store/hook";

export default function WaterMark() {
    const user = useAppSelector((state) => state.auth.user);
    const [position, setPosition] = useState({ top: "40%", left: "30%" });
    useEffect(() => {
        const interval = setInterval(() => {
            const randomTop = Math.random() * 70 + 10;
            const randomLeft = Math.random() * 70 + 10;
            setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div
            style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                transform: "rotate(-25deg)",
                zIndex: 2147483647,
                opacity: 0.25,
                pointerEvents: "none",
                transition: "all 0.6s ease-in-out",
            }}
        >
            <Typography fontSize={18} fontWeight={600} color="text.middle">
                {`${user?.phone} | ${user?.name}`}
            </Typography>
        </div>
    )
}
