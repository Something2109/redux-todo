import type { Reducer } from "redux";

const TodoActionType = {
  CREATE: "TodoAdd",
  UPDATE: "TodoUpdate",
  DELETE: "TodoDelete",
} as const;

type Todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type TodoPayloadCreate = Omit<Todo, "id" | "isCompleted">;
type TodoPayloadUpdate = Partial<Todo> & Pick<Todo, "id">;
type TodoPayloadDelete = Pick<Todo, "id">;

type TodoActionCreate = {
  type: typeof TodoActionType.CREATE;
  payload: Todo;
};

type TodoActionUpdate = {
  type: typeof TodoActionType.UPDATE;
  payload: TodoPayloadUpdate;
};

type TodoActionDelete = {
  type: typeof TodoActionType.DELETE;
  payload: TodoPayloadDelete;
};

type TodoAction<Type extends TodoActionType> =
  Type extends typeof TodoActionType.CREATE
    ? TodoActionCreate
    : Type extends typeof TodoActionType.UPDATE
    ? TodoActionUpdate
    : Type extends typeof TodoActionType.DELETE
    ? TodoActionDelete
    : TodoActionCreate | TodoActionUpdate | TodoActionDelete;

type TodoPayload<Type extends TodoActionType> =
  Type extends typeof TodoActionType.CREATE
    ? TodoPayloadCreate
    : Type extends typeof TodoActionType.UPDATE
    ? TodoPayloadUpdate
    : Type extends typeof TodoActionType.DELETE
    ? TodoPayloadDelete
    : never;

type TodoActionType = (typeof TodoActionType)[keyof typeof TodoActionType];

const defaultDB = [
  {
    id: "1",
    title: "First job",
    description: "Lorem ipsum dolor sit amet",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Second job",
    description: "Lorem ipsum dolor sit amet",
    isCompleted: true,
  },
];

const todoHandler: {
  [key in TodoActionType]: Reducer<Todo[], TodoAction<key>, Todo[]>;
} = {
  [TodoActionType.CREATE]: function (state = [], action): Todo[] {
    return [...state, action.payload];
  },
  [TodoActionType.UPDATE]: function (state = [], action): Todo[] {
    return state.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, ...action.payload };
      }

      return todo;
    });
  },
  [TodoActionType.DELETE]: function (state = [], action): Todo[] {
    return state.filter((todo) => todo.id !== action.payload.id);
  },
} as const;

const createTodoAction: {
  [key in TodoActionType]: (payload: TodoPayload<key>) => TodoAction<key>;
} = {
  [TodoActionType.CREATE]: function (
    payload: TodoPayloadCreate
  ): TodoActionCreate {
    const newObject: Todo = {
      ...payload,
      id: Date.now().toString(),
      isCompleted: false,
    };
    return { type: TodoActionType.CREATE, payload: newObject };
  },
  [TodoActionType.UPDATE]: function (
    payload: TodoPayloadUpdate
  ): TodoActionUpdate {
    return { type: TodoActionType.UPDATE, payload };
  },
  [TodoActionType.DELETE]: function (
    payload: TodoPayloadDelete
  ): TodoActionDelete {
    return { type: TodoActionType.DELETE, payload };
  },
};

const reducer: Reducer<Todo[], TodoAction<TodoActionType>> = (
  state = defaultDB,
  action
) => {
  const handler = todoHandler[action.type];
  const actionByType = action as Parameters<typeof handler>[1];

  return handler ? handler(state, actionByType as never) : state;
};

export { reducer, createTodoAction, TodoActionType };
export type {
  Todo,
  TodoAction,
  TodoPayloadCreate,
  TodoPayloadUpdate,
  TodoPayloadDelete,
};
