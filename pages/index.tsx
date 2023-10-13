import { useMachine } from "@xstate/react";
import { todosMachine } from "../machine/todoAppMachine";

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        throw new Error("failed to load todos");
        return ["take bins out", "do the washing"];
      },
    },
  });

  return (
    <div>
      {JSON.stringify(state.value)}
      <button
        onClick={() => {
          send({
            type: "TODOS_LOADED",
            todos: ["take bins out"],
          });
        }}
      >
        Todos loaded
      </button>
      <button
        onClick={() => {
          send({
            type: "TODOS_LOADING_FAILED",
            errorMessage: "failed to load todos",
          });
        }}
      >
        Todos loading failed
      </button>
    </div>
  );
}
