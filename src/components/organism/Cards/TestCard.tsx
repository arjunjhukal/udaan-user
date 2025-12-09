import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { NotificationBing } from "iconsax-reactjs";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../routes/PATH";
import type { TestProps } from "../../../types/question";
import { formatDate } from "../../../utils/formatDate";
import { getStatus } from "../../../utils/getStatus";

export default function TestCard({ test }: { test: TestProps }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const status = getStatus(test.start_datetime, test.end_datetime);
  const { id } = useParams();
  return (
    <Box
      className="test__card rounded-md p-4 flex flex-col justify-between"
      sx={{
        border: `1px solid ${theme.palette.seperator.dark}`,
      }}
    >
      <div className="top__wrapper">
        {/* Top Section */}
        <div className="test__card__top flex gap-3">
          <Box className="w-full flex justify-between items-start gap-4">
            <Typography variant="subtitle1" fontWeight={600} color="text.dark">
              {test.name}
            </Typography>

            <Typography
              color="text.main"
              bgcolor={"gray.gray1"}
              className="text-[11px]! px-2.5 py-1.5 rounded-md ml-2 font-semibold! capitalize"
            >
              {status}
            </Typography>
          </Box>
        </div>

        <Divider className="my-3!" />

        {/* Content Section */}
        <div className="test__card__content">
          <Typography variant="subtitle2" fontWeight={500} color="text.secondary" className="flex">
            Exam Type:
            <Typography variant="subtitle2" fontWeight={500} color="text.dark" ml={1}>
              {test.test_type}
            </Typography>
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" className="flex" mt={1}>
            Date:
            <Typography variant="subtitle2" fontWeight={600} color="text.dark" ml={1}>
              {formatDate(test.start_datetime)}
            </Typography>
          </Typography>
        </div>
      </div>

      <div className="bottom__wrapper">
        {/* Test Stats Section */}
        <Box
          component="div"
          bgcolor={"gray.gray1"}
          px={3}
          py={1.75}
          borderRadius="6px"
          my="12px"
        >
          <Box className="flex justify-between items-center gap-2">
            <Typography variant="subtitle2" color="text.secondary" className="inline-flex">
              Questions:
              <Typography variant="subtitle2" fontWeight={500} color="text.dark" ml={1}>
                {test.total_questions}
              </Typography>
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" className="inline-flex">
              Duration:
              <Typography
                variant="subtitle2"
                fontWeight={500}
                color="text.dark"
                ml={1}
                sx={{ textWrap: "nowrap" }}
              >
                {test.duration.hours} Hrs {test.duration.minutes} Mins
              </Typography>
            </Typography>
          </Box>

          <Divider className="my-2!" />

          <Box className="flex justify-between items-center gap-2">
            <Typography variant="subtitle2" color="text.secondary" className="inline-flex">
              Full marks:
              <Typography variant="subtitle2" fontWeight={500} color="text.dark" ml={1}>
                {test.full_mark}
              </Typography>
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" className="inline-flex">
              Pass marks:
              <Typography variant="subtitle2" fontWeight={500} color="text.dark" ml={1}>
                {test.pass_mark}
              </Typography>
            </Typography>
          </Box>
        </Box>

        {/* Button Section */}
        <Button
          variant={status === "upcoming" ? "text" : "contained"}
          color={status === "upcoming" ? "inherit" : "primary"}
          fullWidth
          className="mt-4"
          sx={{
            backgroundColor: status === "upcoming" ? "button.light" : "button.main",
            fontWeight: 600,
            fontSize: "14px",
          }}
          startIcon={status === "upcoming" ? <NotificationBing size={24} /> : null}
          disabled={status === "ended"}
          onClick={() => test.test_type === "mcq" ?
            navigate(PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.ROOT({
              courseId: Number(id),
              testId: Number(test.id)
            })) : navigate(PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.SUBJECTIVE_TEST.ROOT({
              courseId: Number(id),
              testId: Number(test.id)
            }))
          }
        >
          {
            !test?.has_taken_test
              ? (
                status === "upcoming" && "Remind Me"
              ) || (
                status === "ongoing" && "Start Test"
              ) || (
                status === "ended" && "Test Ended Already"
              )
              : "Retake Test"
          }

        </Button>
        {test?.has_taken_test ? <Button variant="outlined" color="primary" fullWidth sx={{
          mt: 1
        }}
          onClick={() => navigate(PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.ROOT({
            courseId: Number(id),
            testId: Number(test.id)
          }))}
        >View Result</Button> : ""}
      </div>
    </Box>
  );
}
