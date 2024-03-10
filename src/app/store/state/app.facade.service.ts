import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { taskList } from "./app.selector";
import { fetchTaskList } from "./app.action";
import {ITask} from "../../types/task.type";
import {TaskApiService} from "../../api/task.api.service";

@Injectable({ providedIn: "root" })
export class AppFacadeService {

  taskList$ = this.store.select(taskList);

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

  addTaskList(task: ITask) {
    this.taskApiService.postTask(task);
  }
}
