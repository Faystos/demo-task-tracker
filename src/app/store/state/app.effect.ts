import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { TaskApiService } from "../../api/task.api.service";
import { fetchTaskList, fetchTaskListError, fetchTaskListSuccess } from "./app.action";
import { ITask } from "../../types/task.type";

@Injectable()
export class AppEffect {
  fetchTaskList$ = createEffect(() => (
    this.actions$.pipe(
      ofType(fetchTaskList),
      mergeMap(() => {
        const value: string | null = localStorage.getItem('tasks');
        if (value) {
          const taskList: ITask[] = JSON.parse(value);
          return of( fetchTaskListSuccess({ taskList }))
        } else {
          return this.taskApiService.getTask().pipe(
            map((taskList: ITask[]) => {
              localStorage.setItem('tasks', JSON.stringify(taskList));
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
    private taskApiService: TaskApiService
  ) {}
}
