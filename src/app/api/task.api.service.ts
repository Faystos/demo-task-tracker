import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ITask } from "../types/task.type";

@Injectable({providedIn: "root"})
export class TaskApiService {
  readonly uri = 'assets/task.moc.json'
  constructor(private http: HttpClient) {}

  getTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.uri);
  }

  patchTasks(tasks: ITask[]) {
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
