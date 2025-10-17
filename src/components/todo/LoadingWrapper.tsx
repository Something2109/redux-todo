import { useCallback, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  createLoadingAction,
  LoadingState,
} from "../../redux/reducers/loading";
import { useMainDispatch, useMainState } from "../../redux/store";
import { TodoActionType } from "../../redux/reducers/todo";
import { TodoThunkAction } from "../../redux/thunk/todo";
import Loading from "../loading";

export default function LoadingWrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const loadingState = useMainState((state) => state.loading);
  const dispatch = useMainDispatch();

  const turnOffErrorNotification = useCallback(
    () => dispatch(createLoadingAction(LoadingState.LOADED)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(TodoThunkAction[TodoActionType.LIST]([]));
  }, [dispatch]);

  if (loadingState === LoadingState.LOADING) {
    return <Loading />;
  } else {
    return (
      <>
        {children}
        {loadingState === LoadingState.ERROR && (
          <div className="flex flex-row justify-between bg-red-500 px-4 py-2 rounded-xl">
            <span className="text-white">{t("common.error")}</span>
            <button
              type="button"
              title="Close Error Notification"
              className="cursor-pointer "
              onClick={turnOffErrorNotification}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  }
}
