"use client";

import type { AddTaskModalRef, ITasks } from "@/@types/tasks.type";
import {
  loadFromLocalStorage,
  removeItemFromLocalStorage,
  saveToLocalStorage,
  updateItemInLocalStorage,
} from "@/utils/localStorage";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddTaskModal } from "./_components/AddTaskModal";
import { Header } from "./_components/Header";
import { ListTasks } from "./_components/ListTasks";

export default function Home() {
  const [tasks, setTasks] = useState<Array<ITasks>>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<AddTaskModalRef>(null);

  const refreshTasks = () => {
    setLoading(true);
    try {
      setTasks(loadFromLocalStorage("tasks", []));
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const onAddTask = (taskName: string) => {
    const newTask = {
      id: uuidv4(),
      name: taskName,
      isChecked: false,
    };

    const currentTasks = loadFromLocalStorage("tasks", []);
    saveToLocalStorage("tasks", [...currentTasks, newTask]);
    refreshTasks();
  };

  const onUpdateTask = (taskId: string, isChecked: boolean) => {
    updateItemInLocalStorage("tasks", taskId, { isChecked });
    refreshTasks();
  };

  const onDeleteTask = (taskId: string) => {
    removeItemFromLocalStorage("tasks", taskId);
    refreshTasks();
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Header modalRef={modalRef} />
        {loading ? (
          <p className="text-gray-500">Carregando tarefas...</p>
        ) : (
          <ListTasks
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
            tasks={tasks}
          />
        )}
      </main>

      <AddTaskModal ref={modalRef} onAddTask={onAddTask} />
    </div>
  );
}
