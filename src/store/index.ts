import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { editorReducer } from '@reducers/editorReducer';
import { sidebarReducer } from '@reducers/sidebarReducer';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
    import('redux-immutable-state-invariant').then((module) => {
        const reduxImmutableStateInvariant = module.default();
        middlewares.push(reduxImmutableStateInvariant);
    });
}

const rootReducer = combineReducers({
    editor: editorReducer,
    sidebar: sidebarReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
