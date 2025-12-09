import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import AuthRoot from "../components/pages/auth";
import Login from "../components/pages/auth/login";
import Register from "../components/pages/auth/register";
import VerifyOTP from "../components/pages/auth/verifyOtp";
import CourseRoot from "../components/pages/CourseManagement/course";
import AllCourses from "../components/pages/CourseManagement/course/allCourse";
import SingleCourse from "../components/pages/CourseManagement/course/singleCourse";
import MyCourseRoot from "../components/pages/CourseManagement/myCourse";

import AuthLayout from "../components/pages/layout/AuthLayout";
import NotFound from "../components/pages/layout/NotFound";
import SingleFormAuthLayout from "../components/pages/layout/SingleFormAuthLayout";
import PurchaseRoot from "../components/pages/Purchase";
import PurchaseFailure from "../components/pages/Purchase/failure";
import PurchaseLayout from "../components/pages/Purchase/PurchaseLayout";
import PaymentSuccessPage from "../components/pages/Purchase/success";
import TestManagementRoot from "../components/pages/TestManagement";
import AllTestRoot from "../components/pages/TestManagement/allTest";
import ReviewTestRoot from "../components/pages/TestManagement/reviewTest";
import SingleSubjectiveTest from "../components/pages/TestManagement/singleSubjectiveTest";
import SingleTestRoot from "../components/pages/TestManagement/singleTest";
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
        element: <CourseRoot />,
        children: [
          { path: PATH.COURSE_MANAGEMENT.COURSES.ROOT, element: <AllCourses /> },
          { path: PATH.COURSE_MANAGEMENT.COURSES.VIEW_COURSE.ROOT(), element: <SingleCourse /> },
          { path: PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.ROOT({}), element: <SingleTestRoot /> },
          { path: PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.SUBJECTIVE_TEST.ROOT({}), element: <SingleSubjectiveTest /> },
          { path: PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.ROOT({}), element: <ReviewTestRoot /> },
        ],
      },
      {
        element: <TestManagementRoot />,
        children: [
          { path: PATH.TEST.ROOT, element: <AllTestRoot /> },

        ]
      },
      {
        element: <PurchaseRoot />,
        children: [
          { path: PATH.COURSE_MANAGEMENT.COURSES.PURCHASE.ROOT(), element: <PurchaseLayout /> },
          { path: PATH.COURSE_MANAGEMENT.COURSES.PURCHASE.SUCCESS.ROOT, element: <PaymentSuccessPage /> },
          { path: PATH.COURSE_MANAGEMENT.COURSES.PURCHASE.FAILURE.ROOT, element: <PurchaseFailure /> },
          { path: PATH.COURSE_MANAGEMENT.LIVE_CLASSES.PURCHASE.ROOT(), element: <PurchaseLayout /> },
        ],
      },
      {
        path: PATH.MY_COURSE.ROOT,
        element: <MyCourseRoot />,
      }
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
