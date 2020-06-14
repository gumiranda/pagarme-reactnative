import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import auth from './appModules/auth/reducer';
import user from './appModules/user/reducer';
import appSagas from './appSagas';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middlewares = [sagaMiddleware, createLogger()];

const enhancer = __DEV__
  ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares);

const persistConfig = {
  key: 'devdoido',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'],
};

const rootReducer = combineReducers({auth, user});
const appStore = createStore(
  persistReducer(persistConfig, rootReducer),
  enhancer,
);

const appPersistor = persistStore(appStore);

sagaMiddleware.run(appSagas);

export {appStore, appPersistor};
