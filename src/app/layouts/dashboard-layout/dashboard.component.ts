import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { tap, shareReplay } from "rxjs";

import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AppFacadeService } from "../../store/state/app.facade.service";

import { ITask, TaskStatus } from "../../types/task.type";
import { FilterPipe } from "./pipe/filter.pipe";
import { DialogAddNewTasksComponent } from "./components/dialog-add-new-tasks/dialog-add-new-tasks.component";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  selector: 'dashboard-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FilterPipe,
    DialogAddNewTasksComponent,
    RouterModule,
  ]
})

export class DashboardComponent {
  readonly columns: TaskStatus[]= [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.TESTING, TaskStatus.DONE];
  readonly TaskStatus = TaskStatus;
  public tasks$ = this.appFacadeService.taskList$.pipe(
    tap((value) => this.tasks = structuredClone(value)),
    shareReplay()
  );

  public status$ = this.appFacadeService.status$.pipe(shareReplay());
  private tasks!: ITask[];

  constructor(
    private appFacadeService: AppFacadeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  drop(event: CdkDragDrop<ITask[]>): void {
    const item = { ...event.item.data } as ITask;
    const status = event.container.id as TaskStatus;

    const newTasks = this.tasks.map((task) => {
      if (task.id === item.id) {
        task.status = status;
      }
      return task;
    });
    this.appFacadeService.patchTaskList(newTasks);
    this.appFacadeService.fetchTaskList();
  }

  onOpenFormAddNewTask() {
    const dialogRef = this.dialog.open(
      DialogAddNewTasksComponent,
      {
        width: '35%'
      }
    );
  }

  openTask(evt: ITask) {
    this.router.navigate(['/details-task', evt.id]);
  }
}
