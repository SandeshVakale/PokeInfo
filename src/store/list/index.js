import {createAction, createReducer} from '@reduxjs/toolkit';
import {OfficialArtwork} from '../../utils/officialArtwork';
export const SET_LIST = 'SET_LIST';
export const SET_PAGE = 'SET_PAGE';
export const SET_FETCHING = 'SET_FETCHING';
export const SET_ERROR = 'SET_ERROR';

const setList = createAction(SET_LIST);
const setPage = createAction(SET_PAGE);
const setFetching = createAction(SET_FETCHING);
const setError = createAction(SET_ERROR);

const initialState = {
    listResults: [],
    isFetching: false,
    error: {
      isError: false,
      message: '',
      code: '',
    },
    page: 1,
  };
export const listModel = createReducer(initialState, builder => {
  builder.addCase(setList, (state, action) => {
    if (state.page === initialState.page) {
      action.payload.map(
        (item, index) =>
          (action.payload[index].url = OfficialArtwork(
            item.url.substring(
              item.url.lastIndexOf('pokemon/') + 8,
              item.url.lastIndexOf('/'),
            ),
          )),
      );
      state.listResults = action.payload;
    } else {
      action.payload.map(
        (item, index) =>
          (action.payload[index].url = OfficialArtwork(
            item.url.substring(
              item.url.lastIndexOf('pokemon/') + 8,
              item.url.lastIndexOf('/'),
            ),
          )),
      );
      state.listResults = [...state.listResults, ...action.payload];
    }
    state.isFetching = false;
    state.error = {
      isError: false,
      message: '',
      code: '',
    };
  });
  builder.addCase(setPage, (state, action) => {
    state.page = action.payload;
  });
  builder.addCase(setFetching, (state, action) => {
    state.isFetching = action.payload;
  });
  builder.addCase(setError, (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  });
});