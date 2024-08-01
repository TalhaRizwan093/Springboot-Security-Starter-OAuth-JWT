import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
