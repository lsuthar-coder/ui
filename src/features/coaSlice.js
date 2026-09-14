import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [], // Initialise as an empty array instead of dummy data
}

export const coaSlice = createSlice({
    name: 'coa',
    initialState,
    reducers: {
        getAllCoa: (state, action) => {
            state.value = action.payload
        },

        getCoaById: (state, action) => {
            state.value = action.payload
        },

        createCoa: (state, action) => {
            fetch("https://localhost:7117/coa", {
                method: "POST",
                body: JSON.stringify({ name: action.payload.name, code: action.payload.code }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    response.json()
                })
        },
    },
})

export const { getAllCoa, getCoaById, createCoa } = coaSlice.actions
export default coaSlice.reducer
