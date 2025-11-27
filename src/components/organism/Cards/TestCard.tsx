import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import type { TestProps } from "../../../types";

export default function TestCard({ test }: { test: TestProps }) {
  const theme = useTheme();
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
            Test 1
          </Typography>
          <Typography
            color="text.main"
            bgcolor={"button.light"}
            className="text-[11px]! px-2.5 py-1.5 rounded-md ml-2 font-semibold!"
          >
            Upcoming
          </Typography>
        </Box>
      </div>
      <Divider className="my-3!" />
      <div className="test__card__content">
        <Typography
          variant="textSm"
          fontWeight={500}
          color="text.secondary"
          className="inline-flex"
        >
          Exam Type:{" "}
          <Typography
            variant="textSm"
            fontWeight={500}
            color="text.dark"
            ml={1}
          >
            Subjective Exams
          </Typography>
        </Typography>
        <Typography
          variant="textSm"
          color="text.secondary"
          className="inline-flex"
          mt={1}
        >
          Date:{" "}
          <Typography
            variant="textSm"
            fontWeight={500}
            color="text.dark"
            ml={1}
          >
            9th Nov,2025
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
                12
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
              >
                2 Hrs
              </Typography>
            </Typography>
          </Box>
          <Divider className="my-3!" />
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
                12
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
              >
                2 Hrs
              </Typography>
            </Typography>
          </Box>
        </Box>
      </div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        // sx={{
        //   backgroundColor: "button.main",
        // }}
        className="mt-4"
        fullWidth
      >
        Start Now
      </Button>
    </Box>
  );
}
