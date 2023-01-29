import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartType, CategoryType } from '../../Type'

export type CartStateType = {
    cart: CartType | null
    initialized: boolean
}

const initialState: CartStateType = {
    cart: null,
    initialized: false
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setCart: (state: CartStateType, action: PayloadAction<CartType>) => {
            console.log('>>SET CART', action.payload);

            state.cart = action.payload
            state.initialized = true
        },
        refreshCart: (state: CartStateType) => {
            state.initialized = false
        },
        removeCart: (state: CartStateType) => {
            state.cart = null
            state.initialized = false
        }
    }
})

export default cartSlice.reducer
export const { setCart, refreshCart, removeCart } = cartSlice.actions

