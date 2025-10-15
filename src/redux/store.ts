import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  type Reducer,
} from "redux";
import { thunk, type ThunkAction } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { reducer as lang } from "./reducers/lang";

const reducerObject = { lang };
const mainReducer = combineReducers(reducerObject);

type MainState = ReturnType<typeof mainReducer>;
type ReducerAction = Parameters<typeof mainReducer>[1];
type MainAction = ThunkAction<void, MainState, unknown, ReducerAction>;

const persistedReducer = persistReducer<MainState, ReducerAction>(
  {
    key: "root",
    storage,
    whitelist: ["lang"],
    stateReconciler: autoMergeLevel2,
  },
  mainReducer as unknown as Reducer<MainState, ReducerAction>
);

const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
export type { MainState, ReducerAction, MainAction };
