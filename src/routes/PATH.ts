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
            PURCHASE: {
                ROOT: (id?: number) => (id ? `/courses/${id}/purchase` : "/courses/:id/purchase"),
                SUCCESS: {
                    ROOT: "/courses/:id/purchase/success"
                },
                FAILURE: {
                    ROOT: "/courses/:id/purchase/failure"
                }
            }
        },
        LIVE_CLASSES: {
            ROOT: "/live-classes",
            VIEW_LIVE_CLASS: {
                ROOT: (id?: number) => (id ? `/live-classes/${id}` : "/live-classes/:id"),
            },
            PURCHASE: {
                ROOT: (id?: number) => (id ? `/live-classes/${id}/purchase` : "/live-classes/:id/purchase")
            }
        },
        TEST: {
            ROOT: "/test",
            VIEW_TEST: {
                ROOT: (id?: number) => (id ? `/test/${id}` : "/test/:id"),
            },
            PURCHASE: {
                ROOT: (id?: number) => (id ? `/test/${id}/purchase` : "/test/:id/purchase")
            }
        },
    },
    MY_COURSE: {
        ROOT: "/my-course"
    },
};
