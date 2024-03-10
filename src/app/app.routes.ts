import { Routes } from '@angular/router';
import {DashboardComponent} from "./layouts/dashboard-layout/dashboard.component";
import {TaskListComponent} from "./layouts/task-list-layout/task.list.component";
import {MyTasksComponent} from "./layouts/my-tasks-layout/my-tasks.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: "full" },
  { path: 'task-list', component: TaskListComponent },
  { path: 'my-tasks', component: MyTasksComponent  }
];
