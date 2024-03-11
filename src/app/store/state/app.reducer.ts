import { createReducer, on } from "@ngrx/store";

import { State } from "../type/state.type";
import {
  fetchImplementer, fetchImplementerError, fetchImplementerSuccess,
  fetchStatusList, fetchStatusListError,
  fetchStatusListSuccess,
  fetchTaskList,
  fetchTaskListError,
  fetchTaskListSuccess,
  selectedTask
} from "./app.action";

export const initialState: State = {
  taskList: [],
  taskListLoading: false,
  taskListError: undefined,

  task: undefined,

  statusList: [],
  statusListLoading: false,
  statusListError: undefined,

  implementer: [],
  implementerLoading: false,
  implementerError: undefined
};

export const reducer =  createReducer(
  initialState,
  on(
    fetchTaskList,
    (state: State): State => ({
      ...state,
      taskListLoading: true
    })
  ),
    on(
      fetchTaskListSuccess,
      (state: State, { taskList}): State => ({
        ...state,
        taskList,
        taskListLoading: false,
        taskListError: undefined
      })
    ),
  on(
    fetchTaskListError,
    (state: State, { httpErrorResponse }) => ({
      ...state,
      taskList: [],
      taskListLoading: false,
      taskListError: httpErrorResponse
    })
  ),
  on(
    selectedTask,
    (state: State, { task }) => ({
      ...state,
      task
    })
  ),
  on(
    fetchStatusList,
    (state: State) => ({
      ...state,
      statusListLoading: true
    })
  ),
  on(
    fetchStatusListSuccess,
    (state: State, { statusList }) => ({
      ...state,
      statusList,
      statusListLoading: false,
      statusListError: undefined
    })
  ),
  on(
    fetchStatusListError,
    (state: State, { httpErrorResponse }) => ({
      ...state,
      statusListLoading: false,
      statusListError: httpErrorResponse
    })
  ),
  on(
    fetchImplementer,
    (state: State) => ({
      ...state,
      implementerLoading: true
    })
  ),
  on(
    fetchImplementerSuccess,
    (state: State, { implementer }) => ({
      ...state,
      implementer,
      implementerLoading: false,
      implementerError: undefined
    })
  ),
  on(
    fetchImplementerError,
    (state: State, { httpErrorResponse }) => ({
      ...state,
      implementer: [],
      implementerLoading: false,
      implementerError: httpErrorResponse
    })
  )
);
