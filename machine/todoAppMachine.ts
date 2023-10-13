import { assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUH0C2BDAxgBYCWAdmAHQA2quEmaGsAxBuRWQG6oDWljWPETKUadBulSwEXVPlzJiqUgG0ADAF11GxKAAOU4ouW6QAD0RqANCACelgL4ObAnARLsx9ASzAAnP1Q-Cj0qBQAzIOwKVyEPUVpvSWlZeWNVTW1TA1gjJVJTCwQARgAONQpigGYAdgBWAE4AFjqmsoAmADYbexKGzopSqqrS9obipqaq9umqp2cQUnQ4U1j3EWzDdMLEAFo6msqxmrU1TtKGmtLi06aevdLDutO1aqbO9rqZtTmFteF2D5MF5IJtctskOZEE0ZhQGmNzvV7ghRk4XJI3ACEnQyFAJExMP5An4wXkTJCilMBh8mmoru86tMGsiyocYQ0GmoGoyzlVOg00SB-vFqIl8VJSRDQEVdg0jpdTudLtdbizinKmtznlNaaUmjUxvMHEA */
    id: "todo_machine",
    initial: "load_todos",
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
    },
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    states: {
      todos_loaded: {},
      loading_todos_error: {},
      load_todos: {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "todos_loaded",
              actions: "assignTodosToContext",
            },
          ],
          onError: [
            {
              target: "loading_todos_error",
              actions: "assignErrorMessageToContext",
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data,
        };
      }),
      assignErrorMessageToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
    },
  }
);
