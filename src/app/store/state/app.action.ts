import { createAction, props } from '@ngrx/store';

import { actionType } from "../type/action-type";
import { ITask } from "../../types/task.type";
import {IStatus} from "../../types/status.type";
import {IImplementer} from "../../types/implementer.type";

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

export const selectedTask = createAction(
  actionType.selectedTask,
  props<{ task: ITask }>()
);

export const fetchStatusList = createAction(
  actionType.fetchStatusList
);

export const fetchStatusListSuccess = createAction(
  actionType.fetchStatusListSuccess,
  props<{ statusList: IStatus[] }>()
);

export const fetchStatusListError = createAction(
  actionType.fetchStatusListError,
  props<{ httpErrorResponse: unknown }>()
);

export const fetchImplementer = createAction(
  actionType.fetchImplementer
);

export const fetchImplementerSuccess = createAction(
  actionType.fetchImplementerSuccess,
  props<{ implementer: IImplementer[] }>()
);

export const fetchImplementerError = createAction(
  actionType.fetchImplementerError,
  props<{ httpErrorResponse: unknown }>()
);
