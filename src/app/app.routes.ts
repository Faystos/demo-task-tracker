import { Routes } from '@angular/router';

import { DashboardComponent } from "./layouts/dashboard-layout/dashboard.component";
import { TaskListComponent } from "./layouts/task-list-layout/task.list.component";
import {DetailsTaskComponent} from "./layouts/detail-task-layout/details-task.component";


export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: "full" },
  { path: 'task-list',  component: TaskListComponent  },
  { path: 'details-task/:id', component: DetailsTaskComponent }
];
