import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import {
  useMainDispatch,
  useMainState,
  type MainState,
} from "../../redux/store";
import {
  TodoActionType,
  type Todo,
  type TodoPayloadUpdate,
} from "../../redux/reducers/todo";
import AddRowWithTranslation from "./AddRow";
import Button from "../common/Button";
import { TodoThunkAction } from "../../redux/thunk/todo";

export default function TodoTable() {
  const todos = useMainState((state: MainState) => state.todo);
  const dispatch = useMainDispatch();
  const { t } = useTranslation();

  const onAdd = useCallback(
    (title: string, description: string) =>
      dispatch(TodoThunkAction[TodoActionType.CREATE]({ title, description })),
    [dispatch]
  );

  const onChange = useCallback(
    (todo: TodoPayloadUpdate) =>
      dispatch(TodoThunkAction[TodoActionType.UPDATE](todo)),
    [dispatch]
  );

  const onDelete = useCallback(
    (id: string) => dispatch(TodoThunkAction[TodoActionType.DELETE]({ id })),
    [dispatch]
  );

  return (
    <table className="w-full">
      <thead className="font-bold">
        <tr className="*:p-2 border-b-2 dark:border-white">
          <td>{t("todo.table.isCompleted")}</td>
          <td>{t("todo.table.title")}</td>
          <td>{t("todo.table.description")}</td>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoTableRow
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
          />
        ))}
        <AddRowWithTranslation onAdd={onAdd} />
      </tbody>
    </table>
  );
}

const TodoTableRow = memo(
  ({
    todo,
    onChange,
    onDelete,
  }: {
    todo: Todo;
    onChange: (todo: TodoPayloadUpdate) => void;
    onDelete: (id: string) => void;
  }) => {
    const { t } = useTranslation();

    return (
      <tr className="*:p-2 border-b-2 dark:border-white">
        <td>
          <input
            type="checkbox"
            className="size-4"
            title={`${todo.title}-complete-checkbox`}
            onChange={(evt) =>
              onChange({ id: todo.id, isCompleted: evt.target.checked })
            }
            defaultChecked={todo.isCompleted}
          />
        </td>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>
          <Button type="button" onClick={() => onDelete(todo.id)}>
            {t("common.delete")}
          </Button>
        </td>
      </tr>
    );
  }
);
