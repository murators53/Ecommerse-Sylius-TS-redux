import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import cartSlice from "./reducers/CartSlice";
import CategoryReducer from "./reducers/CategoryReducer";

const store = configureStore({
    reducer: {
        cateogry: CategoryReducer,
        cart: cartSlice,
        auth:AuthSlice
    }
})

const state = store.getState()

export type RootState = typeof state

export default store