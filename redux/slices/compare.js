import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	compareCondition: false,
	compareErrorCondition: false,
	compareList: []
}

const CompareSlice = createSlice({
	name: 'compare',
	initialState,
	reducers: {
		changeCompareCondition: (state, action) => {
			state.compareCondition = action.payload
		},
		addNewCompare: (state, action) => {
			let isMobileDevice = screen.width < 768 ? true : false

			if (isMobileDevice) {
				if (
					state.compareList.length <= 1 &&
					!state.compareList.find(item => item.id === action.payload.id)
				) {
					state.compareList = [...state.compareList, action.payload]
				} else if (state.compareList.length === 2) {
					state.compareErrorCondition = true
				}
			} else {
				state.compareCondition = true

				if (
					state.compareList.length <= 2 &&
					!state.compareList.find(item => item.id === action.payload.id)
				) {
					state.compareList = [...state.compareList, action.payload]
				} else if (state.compareList.length === 3) {
					state.compareErrorCondition = true
				}
			}
		},
		removeCompare: (state, action) => {
			if (action.payload === 'all') {
				state.compareList = []
				state.compareCondition = false
			} else {
				state.compareList = state.compareList.filter(
					item => item.id !== action.payload
				)
				if (state.compareList.length === 0) {
					state.compareCondition = false
				}
			}
		},
		changeErrorModalCondition: (state, action) => {
			state.compareErrorCondition = action.payload
		}
	}
})

export const {
	addNewCompare,
	changeCompareCondition,
	changeErrorModalCondition,
	removeCompare
} = CompareSlice.actions
export default CompareSlice.reducer
