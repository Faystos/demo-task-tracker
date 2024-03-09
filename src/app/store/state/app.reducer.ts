import { createReducer, on } from "@ngrx/store";

import { State } from "../type/state.type";
import { fetchTaskList, fetchTaskListError, fetchTaskListSuccess } from "./app.action";

export const initialState: State = {
  taskList: [],
  taskListLoading: false,
  taskListError: undefined
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
  )
);
