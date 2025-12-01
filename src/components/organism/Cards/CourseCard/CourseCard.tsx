import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH } from '../../../../routes/PATH';
import type { CourseProps } from '../../../../types/course';
import CourseCardButton from './CourseCardButton';
import CourseFeature from './CourseFeature';
import CourseStatus from './CourseStatus';

export default function CourseCard({ course }: { course: CourseProps }) {
    const theme = useTheme();
    return (
        <Box className="course__card rounded-md overflow-hidden relative h-full flex flex-col" sx={{
            border: `1px solid ${theme.palette.textField.border}`
        }}>
            <Box className="course__image " sx={{
                background: theme.palette.primary.contrastText
            }}>
                <img src={course.thumbnail_url || "/logo.svg"} alt={course.name} className='w-full h-full object-cover aspect-347/128' />
            </Box>
            <Box className="course__content h-full p-3  flex flex-col gap-2 justify-between" sx={{
                background: theme.palette.gray.gray1
            }}>
                <div className="top__content">
                    <div className="over__title flex justify-between items-center">
                        <Typography variant='textSm' className='py-0.5 px-2 rounded-md' sx={{
                            background: theme.palette.primary.light,
                            color: theme.palette.primary.main
                        }}>{course?.mega_categories && course?.mega_categories[0]}</Typography>
                        <IconButton size='small' sx={{ p: 0 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                    </div>
                    <Link to={PATH.COURSE_MANAGEMENT.COURSES.VIEW_COURSE.ROOT(course.id)} className=' leading-1.5 mt-2.5 mb-3.5 block'>
                        <Typography variant='textBase' fontWeight={500}>{course.name}</Typography>
                    </Link>
                    <CourseFeature subject={course?.subjects}
                        startFrom={course?.course_expiry?.start_date}
                        endAt={course?.course_expiry?.end_date}
                    />
                </div>
                <div className="footer__content mt-3">
                    <Divider className='mb-2!' />
                    <CourseCardButton courseType={course?.course_type}
                        sellingPrice={course?.sale_price}
                        markedPrice={course?.marked_price}
                        to={PATH.COURSE_MANAGEMENT.COURSES.VIEW_COURSE.ROOT(course.id)}
                    />
                </div>
            </Box>
            <CourseStatus status={course.course_type} />
        </Box>
    )
}
