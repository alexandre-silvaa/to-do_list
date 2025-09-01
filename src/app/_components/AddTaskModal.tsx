import type { AddTaskModalRef } from "@/@types/tasks.type";
import React, { forwardRef, useImperativeHandle, useState } from "react";

type AddTaskModalProps = {
  onAddTask: (taskName: string) => void;
};

export const AddTaskModal = forwardRef<AddTaskModalRef, AddTaskModalProps>(
  ({ onAddTask }, ref) => {
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");

    const onOpen = () => setOpen(true);
    const onClose = () => {
      setTaskName("");
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: onOpen,
      close: onClose,
    }));

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
      if (taskName.trim() === "") return;

      e.preventDefault();
      if (taskName.trim()) {
        onAddTask(taskName.trim());
        setTaskName("");
        onClose();
      }
    };

    return (
      <div
        tabIndex={-1}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose}
      >
        <div
          className="bg-zinc-900 rounded-lg p-6 shadow-lg md:min-w-[320px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4 text-zinc-100">
            Adicionar Tarefa
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Digite a tarefa..."
              className="px-3 py-2 rounded bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={taskName.trim() === ""}
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);
