import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { categoryApi } from '../services/categoryApi';
import { courseApi } from '../services/courseApi';
import { testApi } from '../services/testApi';
import authReducer from "../slice/authSlice";
import purchaseSlice from '../slice/purchaseSlice';
import readingScreenReducer from '../slice/ReadingScreenSlice';
import sessionReducer from "../slice/sessionSlice";
import themeReducer from "../slice/themeSlice";
import toastReducer from "../slice/toastSlice";
export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        toast: toastReducer,
        readScreen: readingScreenReducer,
        purchase: purchaseSlice,
        session: sessionReducer,
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
            .concat(courseApi.middleware)
            .concat(categoryApi.middleware)
            .concat(testApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch