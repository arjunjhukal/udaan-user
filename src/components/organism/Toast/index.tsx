
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { CalendarCircle, ChartSuccess, CloseCircle, Warning2 } from "iconsax-reactjs";
import { hideToast } from "../../../slice/toastSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
export default function Toast() {
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const { open, message, severity } = useAppSelector((state) => state.toast);

	const handleClose = (reason: any) => {
		if (reason === "clickaway") return;
		dispatch(hideToast());
	};

	const borderColor =
		severity === "success"
			? theme.palette.success.main
			: severity === "warning"
				? theme.palette.warning.main
				: severity === "error"
					? theme.palette.error.main
					: "grey";
	const bgColor =
		severity === "success"
			? theme.palette.success.light
			: severity === "warning"
				? theme.palette.warning.light
				: severity === "error"
					? theme.palette.error.light
					: "grey";

	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			sx={{
				width: {
					xs: "100%",
					md: "500px",
				},
			}}>
			<Box
				className={`toast toast__${severity} p-4 rounded-md w-full border `}
				sx={{
					borderColor: borderColor,
					backgroundColor: bgColor,
				}}>
				<Stack justifyContent={"space-between"}>
					<Stack className="gap-3!" alignItems="center">
						{severity === "success" && <ChartSuccess color="success" />}
						{severity === "warning" && <Warning2 color="warning" />}
						{severity === "error" && <CalendarCircle color="error" />}
						<Box>
							<Typography
								variant="textLg"
								color="text.primary"
								className="capitalize font-medium">
								{severity}
							</Typography>
							<Typography variant="subtitle2" color="text.secondary">
								{message}
							</Typography>
						</Box>
					</Stack>
					<IconButton onClick={handleClose}>
						<CloseCircle />
					</IconButton>
				</Stack>
			</Box>
		</Snackbar>
	);
}
