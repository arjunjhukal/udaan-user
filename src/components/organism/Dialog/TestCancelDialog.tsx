import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
interface Props {
    open: boolean;
    handleClose: () => void;
    onSubmit: () => void;
}
export default function TestCancelDialog({ open, handleClose, onSubmit, }: Props) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <div className="flex gap-8 flex-col">
                    <Box bgcolor={"primary.light"} width={64} height={64} className="rounded-full flex justify-center items-center">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.75 24.75H3.41667C2.70942 24.75 2.03115 24.469 1.53105 23.969C1.03095 23.4689 0.75 22.7906 0.75 22.0833V3.41667C0.75 2.70942 1.03095 2.03115 1.53105 1.53105C2.03115 1.03095 2.70942 0.75 3.41667 0.75H8.75M18.0833 19.4167L24.75 12.75M24.75 12.75L18.0833 6.08333M24.75 12.75H8.75" stroke="#303188" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Box>

                    <div className="content flex flex-col gap-2">
                        <Typography variant='h2' fontWeight={600}>Are You Sure You Want to Leave This Quiz?</Typography>
                        <Typography variant='subtitle1' color='text.middle' >Your submitted answers will be evaluated, while unanswered questions will not be considered for marking.</Typography>
                    </div>
                    <div className="footer__action flex justify-between items-center gap-4">
                        <Button fullWidth variant="contained" color='primary' onClick={onSubmit}>Yes</Button>
                        <Button fullWidth variant="outlined" color='primary' onClick={handleClose}>No</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
