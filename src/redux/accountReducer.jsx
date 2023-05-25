import { createSlice } from "@reduxjs/toolkit"
const accountSlice = createSlice(
    {
        name: "account",
        initialState: {
            email: "",
            password: "",
            sex: "",
            specialist: "",
            firstName: "",
            lastName: "",
        },
        reducers: {
            setAcount(state, { payload }) {
                state.email = payload.email
                state.password = payload.password
                state.sex = payload.sex
                state.specialist = payload.specialist
                state.firstName = payload.firstname
                state.lastName = payload.lastname
            },
            logout(state) {
                state.email = ''
                state.password = ''
                state.sex = ''
                state.specialist = ''
                state.firstName = ''
                state.lastName = ''
                localStorage.removeItem("email")
                localStorage.removeItem("password")
            }
        }
    }
)
export const { setAcount,logout } = accountSlice.actions
export default accountSlice.reducer