import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { MatSidenavModule } from '@angular/material/sidenav';

import { TaskGroupComponent } from "./components/task-group/task-group.component";
import { TaskInfoComponent } from "./components/task-info/task-info.component";

@Component({
  templateUrl: 'task.list.component.html',
  styleUrls: ['task.list.component.scss'],
  selector: 'task-list-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSidenavModule,
    TaskGroupComponent,
    TaskInfoComponent,
    RouterOutlet
  ]
})
export class TaskListComponent {}
