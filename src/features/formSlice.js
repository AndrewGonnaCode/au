import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
     status:'',
     
  },
  reducers: {
    
  },
});

export const { increment, decrement, incrementByAmount } = formSlice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = state => state.counter.value;

export default formSlice.reducer;
