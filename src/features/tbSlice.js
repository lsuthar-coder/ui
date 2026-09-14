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
            let temp = i.coa.split('-')
            return {
              accountCode: temp[1],
              name: temp[0],
              debit: i.Debit == "" ? 0.0 : i.Debit,
              credit: i.Credit == "" ? 0.0 : i.Credit
            }
          })
        ]
      })
      console.log(body)
      fetch("https://localhost:7117/tb", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json()
          console.log(response)
        })
    },
  },
})

// Action creators are generated for each case reducer function
export const { getAllTb, getTbById, createTb } = tbSlice.actions

export default tbSlice.reducer