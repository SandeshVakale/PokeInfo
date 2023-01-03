import {createAction, createReducer} from '@reduxjs/toolkit';
export const SET_DETAILS = 'SET_DETAILS';
export const SET_FETCHING_DETAILS = 'SET_FETCHING_DETAILS';
export const SET_ERROR_DETAILS = 'SET_ERROR_DETAILS';

const initialState = {
  details: {},
  isFetching: false,
  error: {
    isError: false,
    message: '',
    code: '',
  },
};

const setDetails = createAction(
  SET_DETAILS,
);
const setFetching = createAction(
  SET_FETCHING_DETAILS,
);
const setError = createAction(
  SET_ERROR_DETAILS,
);
export const detailsModel = createReducer(initialState, builder => {
  builder.addCase(setDetails, (state, action) => {
    state.details = action.payload;
    state.isFetching = false;
    state.error = {
      isError: false,
      message: '',
      code: '',
    };
  });
  builder.addCase(setFetching, (state, action) => {
    state.isFetching = action.payload;
  });
  builder.addCase(setError, (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  });
});