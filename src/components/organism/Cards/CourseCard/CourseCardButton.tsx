import { Button, Typography } from '@mui/material';
import type { CourseTypeProps } from '../../../../types/course';

export default function CourseCardButton({ courseType, sellingPrice, markedPrice }: { courseType: CourseTypeProps, sellingPrice?: string, markedPrice?: string }) {

    const renderPrice = () => {
        switch (courseType) {
            case "free":
                return (
                    <div className="free__price">
                        <Typography className='text-[10px]!' color='text.middle'>This course is free. You can learn anytime you want.</Typography>
                    </div>
                );

            case "expiry":
                return (
                    <div className="expiry__price flex gap-1 items-end">
                        {markedPrice ? <Typography variant='textXs' color='text.middle' className='text-nowrap'><del>NPR. {markedPrice}</del></Typography> : ""}
                        {sellingPrice ? <Typography variant='textBase' fontWeight={600} className='text-nowrap'>NPR. {sellingPrice}</Typography> : ""}
                    </div>
                );

            case "subscription":
                return (
                    <div className="subscription__price">
                        <Typography className='text-[8px]!' color='text.middle'>Starting from</Typography>
                        {sellingPrice ? <Typography variant='textBase' fontWeight={600}>NPR. {sellingPrice}</Typography> : ""}
                    </div>
                );
        }
    };

    const renderButton = () => {
        if (courseType === "free") {
            return (
                <Button href="/" variant="contained" className='primary__btn'>
                    Start Learning
                </Button>
            );
        }
        return (
            <Button href="/" variant="contained" className='primary__btn'>
                Enroll Now
            </Button>
        );
    };

    return (
        <div className="grid grid-cols-2 items-center">
            <div className="pricing__box">
                {renderPrice()}
            </div>

            <div className="button__wrapper text-right">
                {renderButton()}
            </div>
        </div>
    );
}
