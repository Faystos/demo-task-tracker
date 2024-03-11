import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { TaskApiService } from "../../api/task.api.service";
import { LocalStorageApiService } from "../../api/local-storage.api.service";

import {
  fetchImplementer,
  fetchImplementerError,
  fetchImplementerSuccess,
  fetchStatusList,
  fetchStatusListError,
  fetchStatusListSuccess,
  fetchTaskList,
  fetchTaskListError,
  fetchTaskListSuccess
} from "./app.action";
import { ITask, TOKEN_TASK } from "../../types/task.type";
import {StatusTaskApiService} from "../../api/status-task.api.service";
import {IStatus} from "../../types/status.type";
import {ImplementerApiService} from "../../api/implementer.api.service";
import {IImplementer} from "../../types/implementer.type";


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

  fetchStatusList$ = createEffect(() =>(
    this.actions$.pipe(
      ofType(fetchStatusList),
      mergeMap(() => this.statusTaskApiService.getStatus().pipe(
        map((statusList: IStatus[]) => fetchStatusListSuccess({ statusList })),
        catchError((httpErrorResponse) => of(fetchStatusListError({ httpErrorResponse  })))
      ))
    )
  ));

  fetchImplementer$ = createEffect(() => (
    this.actions$.pipe(
      ofType(fetchImplementer),
      mergeMap(() => this.implementerApiService.getImplementer().pipe(
        map((implementer: IImplementer[]) => fetchImplementerSuccess({ implementer })),
        catchError((httpErrorResponse) => of(fetchImplementerError({ httpErrorResponse  })))
      ))
    )
  ));

  constructor(
    private actions$: Actions,
    private taskApiService: TaskApiService,
    private statusTaskApiService: StatusTaskApiService,
    private implementerApiService: ImplementerApiService,
    private localStorageApi: LocalStorageApiService
  ) {}
}
