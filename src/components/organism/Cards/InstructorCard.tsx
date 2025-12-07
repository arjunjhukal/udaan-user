import { Box, Typography, useTheme } from '@mui/material';
import type { Teacher } from '../../../types/course';

export default function InstructorCard({ teacher }: { teacher: Teacher }) {
    const theme = useTheme();
    return (
        <Box className="flex items-center gap-2 rounded-md p-2" sx={{
            border: `1px solid ${theme.palette.textField.border}`
        }}>
            <img src={teacher.profile || "/logo.svg"} alt="" className='w-16 h-16 rounded-md' />
            <div className="content">
                {teacher?.name && <Typography variant='subtitle1' color='text.dark' fontWeight={500}>{teacher?.name}</Typography>}
                {teacher?.designation && <Typography variant='subtitle2' color='text.middle' className='block'>{teacher.designation}</Typography>}
            </div>
        </Box>
    )
}
