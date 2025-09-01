"use client";

import type { AddTaskModalRef } from "@/@types/tasks.type";
import type { RefObject } from "react";

type HeaderProps = {
  readonly onAddTask: (taskName: string) => void;
  readonly modalRef: RefObject<AddTaskModalRef | null>;
};

export function Header({ onAddTask, modalRef }: Readonly<HeaderProps>) {
  return (
    <div className="flex flex-row w-full justify-between gap-[32px] items-center">
      <span className="font-mono text-4xl">ToDo List</span>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => modalRef.current?.open()}
      >
        + Add Task
      </button>
    </div>
  );
}
