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
import TestManagementRoot from "../components/pages/CourseManagement/test";
import AllTests from "../components/pages/CourseManagement/test/allTest";
import NotFound from "../components/pages/layout/NotFound";

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
        children: [
          {
            path: PATH.AUTH.LOGIN.ROOT,
            element: <Login />,
          },
          {
            path: PATH.AUTH.REGISTER.ROOT,
            element: <Register />,
          },
        ],
      },
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
      },
      {
        element: <TestManagementRoot />,
        children: [
          { path: PATH.COURSE_MANAGEMENT.TEST.ROOT, element: <AllTests /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default function GlobalRoutes() {
  return <RouterProvider router={router} />;
}
