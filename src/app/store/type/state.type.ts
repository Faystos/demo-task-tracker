import {ITask} from "../../types/task.type";

export interface State {
  taskList: ITask[];
  taskListLoading: boolean;
  taskListError: unknown;
}
