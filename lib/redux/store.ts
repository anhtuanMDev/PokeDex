import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import pokemonReducer from './reducers/reducer';


// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount the middleware to the store
const store = createStore(
  pokemonReducer,
  applyMiddleware(sagaMiddleware)
);

// Then run the root saga
sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
