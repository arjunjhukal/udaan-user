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
        },
        LIVE_CLASSES: {
            ROOT: "/live-classes",
            CREATE_LIVE_CLASS: {
                ROOT: "/live-classes/create-live-class",
            },
            EDIT_LIVE_CLASS: {
                ROOT: (id?: number) =>
                    id ? `/live-classes/${id}` : "/live-classes/:id",
            },
        },
        TEST: {
            ROOT: "/test",
            CREATE_TEST: {
                ROOT: "/test/create-test",
            },
            EDIT_TEST: {
                ROOT: (id?: string) => (id ? `/test/${id}` : "/test/:id"),
            },
        },
    },
};
