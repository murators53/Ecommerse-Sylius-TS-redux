import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthStateType = {
    token: string | null
    email: string | null
    initialized: boolean
}

const initialState: AuthStateType = {
    token: null,
    email: null,
    initialized: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthToken: (state: AuthStateType, action: PayloadAction<string>) => {
            console.log('>>SET ATUH TOKEN', action);

            localStorage.setItem('authToken', action.payload)


            const splittedJwt = action.payload.split('.')
            const userInfo: any = JSON.parse(window.atob(splittedJwt[1]))

            console.log('>>USER INFO', userInfo);

            state.token = action.payload
            state.email = userInfo.username
            state.initialized = true
        },

        logout: (state: AuthStateType) => {
            localStorage.removeItem('authToken')

            state.token = null
            state.email = null
            state.initialized = false
        }
    }
})

export default authSlice.reducer
export const { setAuthToken, logout } = authSlice.actions

