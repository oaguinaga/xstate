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
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
}
