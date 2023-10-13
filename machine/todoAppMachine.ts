import { createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUH0C2BDAxgBYCWAdmAHQA2quEmaGsAxBuRWQG6oDWljWPETKUadBulSwEXVPlzJiqUgG0ADAF11GxKAAOU4ouW6QAD0RqANCACelgL4ObAnARLsx9ASzAAnP1Q-Cj0qBQAzIOwKVyEPUVpvSWlZeWNVTW1TA1gjJVJTCwQARgAONQpigGYAdgBWAE4AFjqmsoAmADYbexKGzopSqqrS9obipqaq9umqp2cQUnQ4U1j3EWzDdMLEAFom0p690pqKOrULtWLOodLitQanF0k3YXYfTC9ITdztpHNEE0ZhQGmMbvUjghRk8QGs3gk6GQoBImJh-IE-D88iZ-kUpgNOu0mmoaqUmp06tMGpCyqcgQ0Gg9KWpOlVOo8FnD4tREiipFi-qA8e1IaVShQ2p0pdKZZ0avMHEA */
    id: "todo_machine",
    initial: "load_todos",
    schema: {
      // events: {} as
      //   | { type: "TODOS_LOADED"; todos: string[] }
      //   | { type: "TODOS_LOADING_FAILED"; errorMessage: string },
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    states: {
      todos_loaded: {},
      loading_todos_error: {},
      load_todos: {
        invoke: {
          src: "loadTodos",
          onDone: {
            target: "todos_loaded",
          },
          onError: "loading_todos_error",
        },
      },
    },
  },
  {}
);
