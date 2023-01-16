import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { loggerMiddleWare } from './middleware/logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}


const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleWare,
    sagaMiddleWare
].filter((middleWare): middleWare is Middleware => Boolean(middleWare));

const composedEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// root- reducer one big reducer from smaller reducers



export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
