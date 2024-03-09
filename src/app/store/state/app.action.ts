import { createAction, props } from '@ngrx/store';

import { actionType } from "../type/action-type";
import { ITask } from "../../types/task.type";

export const fetchTaskList = createAction(
  actionType.fetchTaskList
);

export const fetchTaskListSuccess = createAction(
  actionType.fetchTaskListSuccess,
  props<{ taskList: ITask[] }>()
);

export const fetchTaskListError = createAction(
  actionType.fetchTaskListError,
  props<{ httpErrorResponse: unknown }>()
);
