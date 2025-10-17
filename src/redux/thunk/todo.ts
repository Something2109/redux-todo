import axios, { type AxiosResponse } from "axios";
import {
  createTodoAction,
  TodoActionType,
  type TodoPayload,
  type TodoPayloadCreate,
  type TodoPayloadDelete,
  type TodoPayloadUpdate,
} from "../reducers/todo";
import { createLoadingAction, LoadingState } from "../reducers/loading";
import type { ThunkAction } from "redux-thunk";
import type { MainAction, MainState } from "../store";

const APIPath = `${import.meta.env.VITE_BACKEND_HOST ?? ""}/todo`;

const TodoRequest: {
  [key in TodoActionType]: (
    payload: TodoPayload<key>
  ) => Promise<AxiosResponse>;
} = {
  [TodoActionType.LIST]: () => {
    return axios.get(APIPath);
  },
  [TodoActionType.CREATE]: (payload: TodoPayloadCreate) => {
    return axios.post(APIPath, payload);
  },
  [TodoActionType.UPDATE]: (payload: TodoPayloadUpdate) => {
    return axios.put(`${APIPath}/${payload.id}`, payload);
  },
  [TodoActionType.DELETE]: (payload: TodoPayloadDelete) => {
    return axios.delete(`${APIPath}/${payload.id}`);
  },
};

function createTodoThunkAction(type: TodoActionType) {
  return (payload: TodoPayload<typeof type>) => {
    return async (dispatch: (action: MainAction) => void) => {
      dispatch(createLoadingAction(LoadingState.LOADING));
      const todoAction = createTodoAction[type](payload);

      try {
        const response = await TodoRequest[type](todoAction.payload);

        dispatch(createLoadingAction(LoadingState.LOADED));

        todoAction.payload = Array.isArray(response.data)
          ? response.data
          : { ...todoAction.payload, ...response.data };
        dispatch(todoAction);
      } catch (_) {
        console.error(_);
        dispatch(createLoadingAction(LoadingState.ERROR));
      }
    };
  };
}

const TodoThunkAction: {
  [key in TodoActionType]: (
    payload: TodoPayload<key>
  ) => ThunkAction<void, MainState, unknown, MainAction>;
} = {
  [TodoActionType.LIST]: createTodoThunkAction(TodoActionType.LIST),
  [TodoActionType.CREATE]: createTodoThunkAction(TodoActionType.CREATE),
  [TodoActionType.UPDATE]: createTodoThunkAction(TodoActionType.UPDATE),
  [TodoActionType.DELETE]: createTodoThunkAction(TodoActionType.DELETE),
};

export { TodoThunkAction };
