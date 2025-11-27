import { Box, Typography, useTheme } from "@mui/material";
import type { CourseProps } from "../../../types/course";
import { renderHtml } from "../../../utils/renderHtml";
import BannerCourseTypeModule from "./BannerCourseTypeModule";

export default function CourseBanner({ data, isLoading }: { data?: CourseProps; isLoading: boolean }) {
    const theme = useTheme();


    const course = data || null;
    return (
        <Box className="rounded-4xl py-11.5  px-16" sx={{
            background: `url(/banner-bg.svg) no-repeat center/cover, ${theme.palette.brand.light}`
        }}>
            <div className="lg:grid grid-cols-20 gap-6">

                <div className="col-span-4">
                    <Box className="thumbnail aspect-264/210 rounded-2xl flex items-center" sx={{
                        background: theme.palette.primary.contrastText
                    }}>
                        <img src={course?.thumbnail_url || "/logo.svg"} alt="" className="w-full h-full object-contain" />
                    </Box>
                </div>

                <div className="col-span-10">
                    <div className="flex flex-col gap-3.5 ">
                        {course?.mega_categories?.length ? (
                            <div className="flex gap-2 flex-wrap">
                                {course?.mega_categories.slice(0, 2).map((category) => (
                                    <Typography variant="textSm" key={category} className="py-0.5 px-2 rounded-md max-w-fit" sx={{
                                        background: theme.palette.primary.contrastText,
                                        color: theme.palette.brand.main
                                    }}>{category}</Typography>
                                ))}
                            </div>
                        ) : ""}
                        <Typography variant="text2Xl" color="white" fontWeight={500} >{course?.name}</Typography>
                        {course?.description ? <Box className="general__content__box" sx={{
                            color: theme.palette.primary.contrastText
                        }}>
                            {renderHtml(course?.description || "")}
                        </Box> : ""}
                        <ul className="features flex gap-8">
                            {course?.subjects ? <li className="flex items-center gap-2">
                                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.08301 3.25L9.08301 14.9167" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M4.06713 0.987863C6.85146 1.518 8.51093 2.62693 9.08333 3.26357C9.65574 2.62693 11.3152 1.518 14.0995 0.987863C15.5101 0.719295 16.2154 0.58501 16.816 1.0997C17.4167 1.6144 17.4167 2.45019 17.4167 4.12176V10.1291C17.4167 11.6576 17.4167 12.4218 17.0312 12.8989C16.6457 13.376 15.797 13.5376 14.0995 13.8608C12.5864 14.1489 11.4055 14.6079 10.5507 15.0692C9.70968 15.5231 9.28916 15.75 9.08333 15.75C8.8775 15.75 8.45698 15.5231 7.61598 15.0692C6.7612 14.6079 5.58027 14.1489 4.06713 13.8608C2.36971 13.5376 1.521 13.376 1.1355 12.8989C0.75 12.4218 0.75 11.6576 0.75 10.1291V4.12176C0.75 2.45019 0.75 1.6144 1.35065 1.0997C1.95131 0.58501 2.65658 0.719295 4.06713 0.987863Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <Typography variant="textLg" color="white">{course?.subjects} Subjects</Typography>
                            </li> : ""}
                        </ul>
                    </div>
                </div>

                <div className="col-span-6">
                    <BannerCourseTypeModule
                        courseType={course?.course_type}
                        courseExpiry={course?.course_expiry}
                        courseSubscription={course?.subscriptions || []}
                    />
                </div>
            </div>
        </Box>
    )
}
