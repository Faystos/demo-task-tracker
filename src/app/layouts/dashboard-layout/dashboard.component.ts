import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { tap, shareReplay} from "rxjs";

import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";

import { AppFacadeService } from "../../store/state/app.facade.service";

import { ITask, TaskStatus } from "../../types/task.type";
import { FilterPipe } from "./pipe/filter.pipe";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  selector: 'dashboard-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    FilterPipe
  ]
})

export class DashboardComponent {
  readonly columns: TaskStatus[]= [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.TESTING, TaskStatus.DONE];

  public tasks$ = this.appFacadeService.taskList$.pipe(
    tap((value) => {
      console.log('value', value)
      this.tasks = structuredClone(value)
    }),
    shareReplay()
  );
  private tasks!: ITask[];


  constructor(private appFacadeService: AppFacadeService) {}

  public drop(event: CdkDragDrop<ITask[]>): void {
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
}
