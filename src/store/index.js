import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import { listModel } from './list';
import { detailsModel } from './details';

const reducers = combineReducers({
    listModel,
    detailsModel,
});
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['listModel', 'detailsModel'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
        return middlewares;
    },
});

const persistor = persistStore(store);

export {store, persistor};