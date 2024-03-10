import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {ITask, TOKEN_TASK} from "../types/task.type";
import {LocalStorageApiService} from "../local-storage.api.service";

@Injectable({providedIn: "root"})
export class TaskApiService {
  readonly uri = 'assets/task.moc.json'
  constructor(
    private http: HttpClient,
    private localStorageApi: LocalStorageApiService
  ) {}

  getTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.uri);
  }

  patchTasks(tasks: ITask[]) {
    this.localStorageApi.remove(TOKEN_TASK);
    this.localStorageApi.set<ITask>(TOKEN_TASK, tasks);
  }

  postTask(task: ITask) {
    const taskList = this.localStorageApi.get<ITask>(TOKEN_TASK);
    taskList.push(task);
    this.localStorageApi.set<ITask>(TOKEN_TASK, taskList);
  }
}
