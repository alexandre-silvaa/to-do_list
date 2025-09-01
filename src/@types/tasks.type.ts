export type ITasks = {
  id: string;
  name: string;
  isChecked: boolean;
};

export type AddTaskModalRef = {
  open: () => void;
  close: () => void;
};
