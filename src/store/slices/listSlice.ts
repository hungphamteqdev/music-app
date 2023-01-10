import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from 'libs/axios/config';
import { RootState, useAppSelector } from 'store/config';
import { GetTracksResponse } from 'types/GetTracksResponse';
import { Track } from 'types/Track';

interface ListState {
  list: Track[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ListState = {
  list: [],
  isLoading: false,
  isError: false,
};

export const fetchList = createAsyncThunk('list', async () => {
  const res = await axiosInstance<GetTracksResponse>({
    url: 'me/play-history/tracks?client_id=oUAZOUnuAAgRGSrrP5uGRMadJzmZzjap&limit=25&offset=0&linked_partitioning=1&app_version=1673011480&app_locale=en',
    headers: {
      Authorization: 'OAuth 2-293799-1205672281-GBeY0DOH3WSPy',
    },
  });
  return res.data.collection;
});

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchList.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.list = [];
    });
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.list = action.payload;
    });
  },
});

export const useListSelector = () => {
  return useAppSelector((state: RootState) => state.list);
};
export default listSlice.reducer;
