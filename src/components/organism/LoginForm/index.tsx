import {
	Button,
	FormHelperText,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PATH } from "../../../routes/PATH";
import { showToast } from "../../../slice/toastSlice";
import { useAppDispatch } from "../../../store/hook";

export default function LoginForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();


	const validationSchema = Yup.object().shape({
		phone: Yup.string().required("Phone Number is required"),
	});
	const formik = useFormik({
		initialValues: {
			phone: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				navigate(`${PATH.AUTH.VERIFY_OTP.ROOT}?phone=${values.phone}`);
			} catch (error: any) {
				dispatch(
					showToast({
						message: error?.data?.message || "Unable to Login",
						severity: "error",
					}),
				);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="login__form">
			<div className="input__field mb-6">
				<InputLabel>Phone Address</InputLabel>
				<OutlinedInput
					fullWidth
					id="phone"
					name="phone"
					placeholder="Enter your phone number"
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.phone && Boolean(formik.errors.phone)}
				/>
				{formik.touched.phone && formik.errors.phone && (
					<FormHelperText error={true} sx={{ mt: 0.5 }}>
						{formik.errors.phone}
					</FormHelperText>
				)}
			</div>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
				disabled={formik.isSubmitting || !formik.dirty}>
				Sign In
			</Button>
		</form>
	);
}
