import { Button, Typography } from '@mui/material';
import type { CourseTypeProps } from '../../../../types/course';

export default function CourseCardButton({ courseType, sellingPrice, markedPrice, to }: { courseType: CourseTypeProps, sellingPrice?: string, markedPrice?: string, to: string }) {

    const renderPrice = () => {
        switch (courseType) {
            case "free":
                return (
                    <div className="free__price">
                        <span className='text-[12px]! lg:text-[10px]! block leading-3.5'>This course is free. You can learn anytime you want.</span>
                    </div>
                );

            case "expiry":
                return (
                    <div className="expiry__price flex gap-1 items-end">
                        {markedPrice ? <Typography variant='caption' color='text.middle' className='text-nowrap'><del>NPR. {markedPrice}</del></Typography> : ""}
                        {sellingPrice ? <Typography variant='subtitle1' fontWeight={600} className='text-nowrap'>NPR. {sellingPrice}</Typography> : ""}
                    </div>
                );

            case "subscription":
                return (
                    <div className="subscription__price">
                        <Typography className='text-[8px]!' color='text.middle'>Starting from</Typography>
                        {sellingPrice ? <Typography variant='subtitle1' fontWeight={600}>NPR. {sellingPrice}</Typography> : ""}
                    </div>
                );
        }
    };

    const renderButton = () => {
        if (courseType === "free") {
            return (
                <Button href={to} fullWidth variant="contained" color='primary'>
                    Start Learning
                </Button>
            );
        }
        return (
            <Button href={to} fullWidth variant="contained" color='primary'>
                Enroll Now
            </Button>
        );
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <div className="pricing__box">
                {renderPrice()}
            </div>

            <div className="button__wrapper text-right w-full">
                {renderButton()}
            </div>
        </div>
    );
}
