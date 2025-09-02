"use client";

import type { ITasks } from "@/@types/tasks.type";
import { Trash } from "lucide-react";

type ListTasksProps = {
  readonly tasks: Array<ITasks>;
  readonly onUpdateTask: (taskId: string, isChecked: boolean) => void;
  readonly onDeleteTask: (taskId: string) => void;
};

export function ListTasks({
  onDeleteTask,
  onUpdateTask,
  tasks,
}: Readonly<ListTasksProps>) {
  return (
    <div className="w-full max-w-2xl">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm md:text-base max-w-[400px]">
          Suas tarefas estão em dia? Que milagre! Crie uma nova só para não
          perder o costume ;)
        </p>
      ) : (
        <table className="w-full text-sm">
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={Number(index)}
                data-ischecked={!!task.isChecked}
                className="items-center border-b border-zinc-800 last:border-0 hover:bg-zinc-800 transition-colors data-[ischecked=true]:bg-zinc-800"
              >
                <td className="p-2 text-zinc-100">
                  <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={(event) =>
                      onUpdateTask(
                        task.id,
                        (event.target as HTMLInputElement).checked
                      )
                    }
                  />
                </td>
                <td
                  data-ischecked={!!task.isChecked}
                  className="p-2 text-zinc-100 data-[ischecked=true]:line-through"
                >
                  {task.name}
                </td>
                <td className="py-2 text-center">
                  <button
                    data-ischecked={!!task.isChecked}
                    className="p-1 rounded transition-colors text-red-500/50 hover:text-red-500 hover:scale-110 hover:cursor-pointer data-[ischecked=true]:text-red-300/20 data-[ischecked=true]:cursor-default"
                    onClick={() => onDeleteTask(task?.id)}
                    disabled={task?.isChecked}
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
