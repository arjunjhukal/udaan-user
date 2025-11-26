import { Button, Typography } from "@mui/material";
import type { CourseExpiry, CourseSubscription, CourseTypeProps } from '../../../types/course';

interface Props {
    courseType?: CourseTypeProps;
    courseExpiry?: CourseExpiry;
    courseSubscription?: CourseSubscription[];
}

export default function BannerCourseTypeModule({ courseType, courseExpiry, courseSubscription }: Props) {

    const renderButtons = () => {
        if (courseType === "free") {
            return <Button variant="contained" className="black__btn" fullWidth>Start Learning</Button>;
        }
        return (
            <div className="actions flex flex-col gap-2">
                {courseType === "subscription" && <Button variant="contained" className="black__btn" fullWidth>View Subscription</Button>}
                {courseType === "expiry" && <Button variant="contained" className="black__btn" fullWidth>Enroll Now</Button>}
                <Button variant="contained" fullWidth>Free Trial</Button>
            </div>
        );
    };

    const renderContent = () => {
        switch (courseType) {
            case "free":
                return (
                    <div className="free__course flex flex-col gap-4">
                        <Typography color="white" variant="textLg" fontWeight={500}>Course Includes</Typography>
                        <ul className="list-disc pl-5 text-white">
                            <li>Allow students to access quality learning materials.</li>
                            <li>Encourage new users to explore the platform.</li>
                            <li>Promote lifelong learning with easily accessible resources.</li>
                        </ul>
                        {renderButtons()}
                    </div>
                );

            case "expiry":

                return (
                    <div className="expiry flex flex-col gap-4">
                        <Typography color="white" variant="textLg" fontWeight={500}>Expiry Course</Typography>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <Typography variant="textXs" color="white">Starts from</Typography>
                                <Typography variant="textSm" color="white" fontWeight={600}>{courseExpiry?.start_date}</Typography>
                            </div>
                            <div>
                                <Typography variant="textXs" color="white">Ends On</Typography>
                                <Typography variant="textSm" color="white" fontWeight={600}>{courseExpiry?.end_date}</Typography>
                            </div>
                            <div>
                                <Typography variant="textXs" color="white"><del>{courseExpiry?.price}</del></Typography>
                                {/* <Typography variant="textSm" color="white" fontWeight={600}>{courseExpiry.discountedPrice}</Typography> */}
                            </div>
                        </div>
                        {renderButtons()}
                    </div>
                );

            case "subscription":
                return (
                    <div className="subscription__course flex flex-col gap-4">
                        <Typography color="white" variant="textLg" fontWeight={500}>Subscription Plans</Typography>
                        {courseSubscription?.map((plan, index) => (
                            <div key={index} className="grid grid-cols-2 gap-2">
                                <Typography color="white">{plan.price}</Typography>
                                <Typography color="white">{plan.price} / </Typography>
                            </div>
                        ))}
                        {renderButtons()}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="rounded-md p-4 bg-[rgba(255,255,255,0.12)] flex flex-col gap-4">
            {renderContent()}
        </div>
    );
}
