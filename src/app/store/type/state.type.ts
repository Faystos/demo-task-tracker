import { ITask } from "../../types/task.type";
import { IStatus } from "../../types/status.type";
import { IImplementer } from "../../types/implementer.type";

export interface State {
  taskList: ITask[];
  taskListLoading: boolean;
  taskListError: unknown;

  task: ITask | undefined;

  statusList: IStatus[];
  statusListLoading: boolean;
  statusListError: unknown;

  implementer: IImplementer[];
  implementerLoading: boolean;
  implementerError: unknown;
}
