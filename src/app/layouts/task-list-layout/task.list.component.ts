import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { shareReplay } from "rxjs";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

import { AppFacadeService } from "../../store/state/app.facade.service";
import { ITask } from "../../types/task.type";


@Component({
  templateUrl: 'task.list.component.html',
  styleUrls: ['task.list.component.scss'],
  selector: 'task-list-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule
  ]
})
export class TaskListComponent implements OnInit {
  public tasks$ = this.appFacadeService.taskList$.pipe(shareReplay());
  private task!: ITask

  constructor(private appFacadeService: AppFacadeService) {}

  ngOnInit() {
    console.log(this.task)
  }

  onSelectTask(evt: ITask) {
    this.task = evt;
  }
}
