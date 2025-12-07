import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
export type SubmissionType = "submit" | "timer"
interface Props {
    open: boolean;
    handleClose: () => void;
    onSubmit: () => void;
    type: SubmissionType;
    loading?: boolean;

}
export default function TestSubmissionDialog({ open, handleClose, onSubmit, type, loading }: Props) {
    return (
        <Dialog open={open} onClose={type === "submit" ? handleClose : () => { }}>
            <DialogContent>
                <div className="flex gap-8 flex-col">
                    <Box bgcolor={"primary.light"} width={64} height={64} className="rounded-full flex justify-center items-center">
                        {type === "timer" ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6693 17.6667C27.6693 24.1067 22.4426 29.3333 16.0026 29.3333C9.5626 29.3333 4.33594 24.1067 4.33594 17.6667C4.33594 11.2267 9.5626 6 16.0026 6C22.4426 6 27.6693 11.2267 27.6693 17.6667Z" stroke="#303188" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 10.6667V17.3334" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 2.66675H20" stroke="#848484" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                            : <img src='/submit.svg' />
                        }
                    </Box>

                    <div className="content flex flex-col gap-2">
                        <Typography variant='h2' fontWeight={600}>{type === "timer" ? "Your timer’s up!" : "Submit Test"}</Typography>
                        <Typography variant='subtitle1' color='text.middle' >{type === "timer" ? "The 1.5-hours time limit for your 1st quiz has ended. " : "Are you sure you want to submit quiz? Cause you still have few more mins left."}</Typography>
                    </div>
                    <div className="footer__action flex justify-between items-center gap-4">
                        <Button fullWidth variant="contained" color='primary' onClick={onSubmit}>{loading ? "Submitting" : "Submit"} Test</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
