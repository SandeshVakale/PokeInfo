import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
    themeMode: {
        mode: 'light',
    },
};

const setThemeMode = createAction('themeMode/setThemeMode');
export const themeModeModel = createReducer(initialState, builder => {
    builder.addCase(setThemeMode, (state, action) => {
        state.themeMode = action.payload;
    });
});