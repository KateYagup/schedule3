import {createSlice} from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
     modeState: false,
  },
reducers:{
  toggleMode(state){
    state.modeState = !state.modeState;
    // console.log(state)
  }
}
})

export const {toggleMode } = modeSlice.actions;
export default modeSlice.reducer;