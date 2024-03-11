import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { shareReplay, tap } from "rxjs";

import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { AppFacadeService } from "../../../../store/state/app.facade.service";

import { ITask } from "../../../../types/task.type";

@Component({
  selector: 'task-group-component',
  templateUrl: 'task-group.component.html',
  styleUrls: ['task-group.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonToggle,
    MatButtonToggleGroup
  ]
})
export class TaskGroupComponent {
  private tasks!: ITask[];
  public tasks$ = this.appFacadeService.taskList$
    .pipe(
      tap((value) => this.tasks = value),
      shareReplay()
    );
  public task$ = this.appFacadeService.task$
    .pipe(
      tap(value => {
        if (value) this.appFacadeService.selectedTask(this.tasks.find(item => item.id === value.id) as ITask);
      }),
      shareReplay()
    );
  constructor(private appFacadeService: AppFacadeService) {}

  onSelectTask(evt: ITask) {
    this.appFacadeService.selectedTask(evt);
  }
}
