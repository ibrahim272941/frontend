import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './saga';
import thunk from 'redux-thunk';

const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare, thunk];
let store;
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(...middleWare),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleWare),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
}

sagaMiddleWare.run(rootSaga);

export default store;
