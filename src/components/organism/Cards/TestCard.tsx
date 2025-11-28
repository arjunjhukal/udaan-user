import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { NotificationBing } from "iconsax-reactjs";
import type { TestProps } from "../../../types";
import { formatDate } from "../../../utils/formatDate";
import { getStatus } from "../../../utils/getStatus";

export default function TestCard({ test }: { test: TestProps }) {
  const theme = useTheme();
  const status = getStatus(test.start_datetime);


  return (
    <Box
      className="test__card rounded-md p-4"
      sx={{
        border: `1px solid ${theme.palette.seperator.dark}`,
      }}
    >
      <div className="test__card__top flex gap-3">
        <Box className="w-full flex justify-between items-center">
          <Typography variant="textBase" fontWeight={600} color="text.dark">
            {test.name}
          </Typography>
          <Typography
            color="text.main"
            bgcolor={"button.light"}
            className="text-[11px]! px-2.5 py-1.5 rounded-md ml-2 font-semibold!"
          >
            {status}
          </Typography>
        </Box>
      </div>
      <Divider className="my-3!" />
      <div className="test__card__content">
        <Typography
          variant="textSm"
          fontWeight={500}
          color="text.secondary"
          className="flex"
        >
          Exam Type:{" "}
          <Typography
            variant="textSm"
            fontWeight={500}
            color="text.dark"
            ml={1}
          >
            {test.type}
          </Typography>
        </Typography>
        <Typography
          variant="textSm"
          color="text.secondary"
          className="flex"
          mt={1}
        >
          Date:{" "}
          <Typography
            variant="textSm"
            fontWeight={600}
            color="text.dark"
            ml={1}
          >
            {formatDate(test.start_datetime)}
          </Typography>
        </Typography>
        <Box
          component={"div"}
          bgcolor={"button.light"}
          px={3}
          py={1.75}
          borderRadius={"6px"}
          my={"12px"}
        >
          <Box
            component={"div"}
            className="flex justify-between items-center gap-2"
          >
            <Typography
              variant="textSm"
              color="text.secondary"
              className="inline-flex"
            >
              Questions:{" "}
              <Typography
                variant="textSm"
                fontWeight={500}
                color="text.dark"
                ml={1}
              >
                {test?.questions}
              </Typography>
            </Typography>
            <Typography
              variant="textSm"
              color="text.secondary"
              className="inline-flex"
            >
              Duration:{" "}
              <Typography
                variant="textSm"
                fontWeight={500}
                color="text.dark"
                ml={1}
                sx={{
                  textWrap: "nowrap"
                }}
              >
                {test.duration.hours} Hrs {test.duration.minutes} Mins
              </Typography>
            </Typography>
          </Box>
          <Divider className="my-2!" />
          <Box
            component={"div"}
            className="flex justify-between items-center gap-2"
          >
            <Typography
              variant="textSm"
              color="text.secondary"
              className="inline-flex"
            >
              Full marks:{" "}
              <Typography
                variant="textSm"
                fontWeight={500}
                color="text.dark"
                ml={1}
              >
                {test.full_marks}
              </Typography>
            </Typography>
            <Typography
              variant="textSm"
              color="text.secondary"
              className="inline-flex"
            >
              Pass marks:{" "}
              <Typography
                variant="textSm"
                fontWeight={500}
                color="text.dark"
                ml={1}
              >
                {test.pass_marks}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </div>
      <Button
        variant={status === "upcoming" ? "text" : "contained"}
        color={status === "upcoming" ? "inherit" : "primary"}
        className="mt-4"
        fullWidth
        sx={{
          backgroundColor: status === "upcoming" ? "button.light" : "button.main",
          fontWeight: 600,
          fontSize: "16px",
        }}
        startIcon={
          status === "upcoming" ? (
            <NotificationBing size={24} />
          ) : null
        }
      >
        {status === "upcoming" && "Remind Me"}
        {status === "today" && "Start Test"}
      </Button>
    </Box>
  );
}
