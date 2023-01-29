import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType } from '../../Type'

export type CategoryState = {
    categories: CategoryType[],
    initialized: boolean
}

const initialState: CategoryState = {
    categories: [],
    initialized: false
}

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setCategories: (state:CategoryState, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload
            state.initialized = true
        }
    }
})

export default categorySlice.reducer
export const { setCategories } = categorySlice.actions

