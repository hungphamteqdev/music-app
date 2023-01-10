import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store/config';

interface RouterState {
  currentPage: 1 | 2 | 3;
}

const initialState: RouterState = {
  currentPage: 1,
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    toPage: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { toPage } = routerSlice.actions;
export const useRouterSelector = () => useAppSelector((state) => state.router);
export default routerSlice.reducer;
