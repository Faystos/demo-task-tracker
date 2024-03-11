import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { implementer, status, task, taskList } from "./app.selector";
import {fetchImplementer, fetchStatusList, fetchTaskList, selectedTask} from "./app.action";

import { ITask } from "../../types/task.type";
import { TaskApiService } from "../../api/task.api.service";

@Injectable({ providedIn: "root" })
export class AppFacadeService {

  taskList$ = this.store.select(taskList);
  task$ = this.store.select(task);
  status$ = this.store.select(status);
  implementer$ = this.store.select(implementer)

  constructor(
    private store: Store,
    private taskApiService: TaskApiService
  ) {}

  fetchTaskList() {
    this.store.dispatch(fetchTaskList());
  }

  patchTaskList(taskList: ITask[]) {
    this.taskApiService.patchTasks(taskList);
  }

  patchTask(task: ITask) {
    this.taskApiService.patchTask(task);
  }

  addTaskList(task: ITask) {
    this.taskApiService.postTask(task);
  }

  selectedTask(task: ITask) {
    this.store.dispatch(selectedTask({ task }));
  }

  fetchStatusList() {
    this.store.dispatch(fetchStatusList());
  }

  fetchImplementer() {
    this.store.dispatch(fetchImplementer());
  }
}
