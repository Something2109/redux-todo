import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  type Reducer,
} from "redux";
import { useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { reducer as lang } from "./reducers/lang";
import { reducer as todo } from "./reducers/todo";

const reducerObject = { lang, todo };
const mainReducer = combineReducers(reducerObject);

type MainState = ReturnType<typeof mainReducer>;
type MainAction = Parameters<typeof mainReducer>[1];
type MainDispatch = typeof store.dispatch;

const persistedReducer = persistReducer<MainState, MainAction>(
  {
    key: "root",
    storage,
    // whitelist: ["lang", "todo"],
    stateReconciler: autoMergeLevel2,
  },
  mainReducer as unknown as Reducer<MainState, MainAction>
);

const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

const useMainState = useSelector.withTypes<MainState>();
const useMainDispatch = useDispatch.withTypes<MainDispatch>();

export { store, persistor, useMainState, useMainDispatch };
export type { MainState, MainAction, MainDispatch };
