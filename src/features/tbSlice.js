import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const tbSlice = createSlice({
  name: 'tb',
  initialState,
  reducers: {
    getAllTb: (state, action) => {
      state.value = action.payload
    },

    getTbById: (state, action) => {
      state.value = action.payload
    },

    createTb: (state, action) => {
      const body = JSON.stringify({
        entries: [
          ...action.payload.data.map((i) => {
            let temp = i.account.split('-')
            return {
              accountCode: temp[1],
              name: temp[0],
              debit: i.debit == "" ? 0.0 : i.debit,
              credit: i.credit == "" ? 0.0 : i.credit
            }
          })
        ]
      })
      fetch("https://localhost:7117/tb", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { getAllTb, getTbById, createTb } = tbSlice.actions

export default tbSlice.reducer