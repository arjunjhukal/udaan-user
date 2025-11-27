import { Box, Button, Dialog, DialogContent, IconButton, Typography, useTheme } from '@mui/material';
import { CloseCircle } from 'iconsax-reactjs';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/PATH';
import { useAppSelector } from '../../../store/hook';

export default function PurchaseCourseDialog() {
    const theme = useTheme();
    const purchase = useAppSelector((state) => state.purchase);
    const navigate = useNavigate();
    return (
        <Dialog open={purchase.open} sx={{
            "& .Muipaper-root": {
                background: theme.palette.primary.white
            }
        }}>
            <DialogContent className="py-8! px-13! relative rounded-2xl relative" sx={{
                minWidth: "409px",
                background: theme.palette.primary.contrastText
            }}>
                <IconButton className='absolute! right-2 top-2' >
                    <CloseCircle variant='Bulk' color={theme.palette.error.main} />
                </IconButton>
                <Box sx={{
                    background: theme.palette.primary.light
                }} className='rounded-full min-w-20 h-20 aspect-square flex items-center justify-center mb-6' >
                    <img src="/no-money.svg" alt="" className='object-contain' />
                </Box>
                <Typography variant='text3Xl' fontWeight={600}>{purchase.title}</Typography>
                <Typography variant='textBase' color='text.middle' className='block mt-4'>{purchase.message}</Typography>

                <div className="action__group flex gap-4 mt-8">
                    <Button variant='contained' size='small' fullWidth className='primary__btn' onClick={() => {
                        navigate(PATH.PURCHASE.PURCHASE_COURSE.ROOT(Number(purchase.courseId)))
                    }}>Purchase Course</Button>
                    <Button variant='contained' size='small' fullWidth className='secondary__btn'>Back to Course Details</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
