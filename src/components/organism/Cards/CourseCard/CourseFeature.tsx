import { Divider, Typography, useTheme } from "@mui/material";
import { formatDateCustom } from "../../../../utils/dateFormat";
interface Props {
    subject?: number;
    startFrom?: string;
    endAt?: string;

}
export default function CourseFeature({ subject, startFrom, endAt }: Props) {
    const theme = useTheme();
    if (!subject && !startFrom && !endAt) {
        return
    }
    return (
        <div className="flex items-center gap-2 ">
            {startFrom || endAt ? <div className="expiry__wrapper">
                <div className="feature flex gap-2 items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M2 6.66665H14M3.33333 2.66665H12.6667C13.403 2.66665 14 3.2636 14 3.99998V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V3.99998C2 3.2636 2.59695 2.66665 3.33333 2.66665Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div className="feature-content items-center flex gap-1.5">
                        {startFrom ? <div className="start">
                            <Typography variant="textXs" color="primary">Starts from</Typography>
                            <Typography variant="textXs" fontWeight={500} className="block">
                                {formatDateCustom(startFrom, {
                                    shortMonth: true,
                                })}
                            </Typography>

                        </div> : ""}
                        {endAt ? <>
                            <Divider sx={{ width: "10px", borderColor: theme.palette.seperator.dark }} />
                            <div className="end">
                                <Typography variant="textXs" color="primary">Ends</Typography>
                                <Typography variant="textXs" fontWeight={500} className="block">
                                    {formatDateCustom(endAt, {
                                        shortMonth: true,
                                    })}
                                </Typography>

                            </div>
                        </> : ""}
                    </div>
                </div>
            </div> : ""}
            <Divider sx={{ borderColor: theme.palette.seperator.dark, height: 20 }} orientation="vertical" />
            {subject ? <div className="feature flex gap-2 items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4L8 13.3333" stroke="#111111" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M3.98671 2.19029C6.21418 2.6144 7.54175 3.50154 7.99967 4.01086C8.4576 3.50154 9.78517 2.6144 12.0126 2.19029C13.1411 1.97544 13.7053 1.86801 14.1858 2.27976C14.6663 2.69152 14.6663 3.36015 14.6663 4.69741V9.50331C14.6663 10.726 14.6663 11.3374 14.3579 11.7191C14.0495 12.1008 13.3706 12.2301 12.0126 12.4886C10.8021 12.7191 9.85738 13.0864 9.17355 13.4554C8.50075 13.8185 8.16434 14 7.99967 14C7.83501 14 7.49859 13.8185 6.82579 13.4554C6.14197 13.0864 5.19723 12.7191 3.98671 12.4886C2.62877 12.2301 1.9498 12.1008 1.64141 11.7191C1.33301 11.3374 1.33301 10.726 1.33301 9.50331V4.69741C1.33301 3.36015 1.33301 2.69152 1.81353 2.27976C2.29405 1.86801 2.85827 1.97544 3.98671 2.19029Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <Typography variant="textSm" fontWeight={400}>{subject} Subjects</Typography>
            </div> : ""}
        </div>
    )
}
