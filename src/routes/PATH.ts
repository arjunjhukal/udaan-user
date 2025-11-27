export const PATH = {
    AUTH: {
        LOGIN: {
            ROOT: "/auth/login",
        },
        REGISTER: {
            ROOT: "/auth/register",
        },
        VERIFY_OTP: {
            ROOT: "/auth/verify-otp",
        },
        FORGOT_OTP: {
            ROOT: "/auth/forgot-otp",
        },
    },
    DASHBOARD: {
        ROOT: "/dashboard",
    },
    COURSE_MANAGEMENT: {
        ROOT: "/course-management",
        COURSES: {
            ROOT: "/courses",
            VIEW_COURSE: {
                ROOT: (id?: number) => (id ? `/courses/${id}` : "/courses/:id"),
            },
            MY_COURSE: {
                ROOT: "/courses/my-course"
            }
        },
        LIVE_CLASSES: {
            ROOT: "/live-classes",
            VIEW_LIVE_CLASS: {
                ROOT: (id?: number) => (id ? `/courses/${id}` : "/courses/:id"),
            },
        },
        TEST: {
            ROOT: "/test",
            VIEW_TEST: {
                ROOT: (id?: number) => (id ? `/courses/${id}` : "/courses/:id"),
            },
        },
    },
    PURCHASE: {
        ROOT: "/purchase",
        PURCHASE_COURSE: {
            ROOT: (id?: number) => (id ? `/purchase/${id}` : "/purchase/:id"),
        },
    }
};
