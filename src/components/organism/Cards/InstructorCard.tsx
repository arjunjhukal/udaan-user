import { Box, Typography } from '@mui/material'

export default function InstructorCard() {
    return (
        <Box className="flex gap-2 rouned-md">
            <img src="/logo.svg" alt="" className='w-16 h-16 rounded-md' />
            <div className="content">
                <Typography>Arjun Jhukal</Typography>
                <Typography>Loksewa Expert</Typography>
            </div>
        </Box>
    )
}
