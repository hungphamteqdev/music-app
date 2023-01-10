import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import detailSliceReducer from 'store/slices/detailSlice';
import listSliceReducer from 'store/slices/listSlice';
import routerSliceReducer from 'store/slices/routerSlice';

export const store = configureStore({
  reducer: {
    list: listSliceReducer,
    router: routerSliceReducer,
    detail: detailSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
