import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { taskList } from "./app.selector";
import { fetchTaskList } from "./app.action";

@Injectable({ providedIn: "root" })
export class AppFacadeService {

  userList$ = this.store.select(taskList);

  constructor(private store: Store) {}

  fetchTaskList() {
    this.store.dispatch(fetchTaskList());
  }
}
