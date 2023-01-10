import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store/config';

export interface DetailState {
  title: string;
  username: string;
  musicSrc: string;
  avatar: string;
  id: number;
}

const initialState: DetailState = {
  title: '',
  username: '',
  musicSrc: '',
  avatar: '',
  id: -1,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    getDetail: (_, action: PayloadAction<DetailState>) => {
      return action.payload;
    },
  },
});

export const { getDetail } = detailSlice.actions;
export const useDetailSelector = () => useAppSelector((state) => state.detail);
export default detailSlice.reducer;
