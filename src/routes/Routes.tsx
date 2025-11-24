import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import AuthRoot from "../components/pages/auth";
import Login from "../components/pages/auth/login";
import Register from "../components/pages/auth/register";
import VerifyOTP from "../components/pages/auth/verifyOtp";
import AuthLayout from "../components/pages/layout/AuthLayout";
import SingleFormAuthLayout from "../components/pages/layout/SingleFormAuthLayout";
import { PATH } from "./PATH";
import Private from "./Private";

const router = createBrowserRouter([
    {
        element: <AuthRoot />,
        children: [
            {
                path: PATH.AUTH.VERIFY_OTP.ROOT,
                element: (
                    <SingleFormAuthLayout>
                        <VerifyOTP />
                    </SingleFormAuthLayout>
                ),
            },
            {
                element: <AuthLayout />,
                children: [{
                    path: PATH.AUTH.LOGIN.ROOT,
                    element: <Login />
                },
                {
                    path: PATH.AUTH.REGISTER.ROOT,
                    element: <Register />
                }]
            }

        ],
    },
    {
        element: <Private />,
        children: [
            {
                index: true,
                path: "/",
                element: <App />,
            },
            {
                path: PATH.DASHBOARD.ROOT,
                element: <App />,
            },]
    }
])
export default function GlobalRoutes() {
    return <RouterProvider router={router} />;
}