import type { Reducer } from "redux";

const LoadingActionType = "Loading" as const;

const LoadingState = {
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error",
} as const;

type LoadingState = (typeof LoadingState)[keyof typeof LoadingState];

type LoadingAction = {
  type: typeof LoadingActionType;
  state: LoadingState;
};

const reducer: Reducer<LoadingState, LoadingAction> = (
  state = LoadingState.LOADED,
  action
) => {
  if (!action.state) return state;
  console.log(action.state);
  return action.state;
};

function createLoadingAction(state: LoadingState): LoadingAction {
  return {
    type: LoadingActionType,
    state,
  };
}

export { reducer, createLoadingAction, LoadingState };
export type { LoadingAction };
