import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { TaskApiService } from "../../api/task.api.service";
import { LocalStorageApiService } from "../../local-storage.api.service";

import { fetchTaskList, fetchTaskListError, fetchTaskListSuccess } from "./app.action";
import { ITask, TOKEN_TASK } from "../../types/task.type";


@Injectable()
export class AppEffect {
  fetchTaskList$ = createEffect(() => (
    this.actions$.pipe(
      ofType(fetchTaskList),
      mergeMap(() => {
        if (this.localStorageApi.isItemStorage(TOKEN_TASK)) {
          const taskList = this.localStorageApi.get<ITask>(TOKEN_TASK);
          return of( fetchTaskListSuccess({ taskList }))
        } else {
          return this.taskApiService.getTask().pipe(
            map((taskList: ITask[]) => {
              this.localStorageApi.set<ITask>(TOKEN_TASK, taskList)
              return fetchTaskListSuccess({ taskList })
            }),
            catchError((httpErrorResponse) => of(fetchTaskListError({ httpErrorResponse })))
          )
        }
      })
    )
  ));

  constructor(
    private actions$: Actions,
    private taskApiService: TaskApiService,
    private localStorageApi: LocalStorageApiService
  ) {}
}
