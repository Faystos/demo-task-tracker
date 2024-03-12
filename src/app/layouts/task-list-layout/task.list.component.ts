import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { shareReplay, Subscription } from "rxjs";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SelectionModel } from "@angular/cdk/collections";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TaskFilterComponent } from "./components/task-filter/task-filter.component";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { AppFacadeService } from "../../store/state/app.facade.service";
import { TaskSortService } from "../../shared/services/task-sort.service";
import { TaskFilterService } from "../../shared/services/task-filter.service";
import { ITask } from "../../types/task.type";
import { SortType } from "../../types/filter.type";

@Component({
  templateUrl: 'task.list.component.html',
  styleUrls: ['task.list.component.scss'],
  selector: 'task-list-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TaskFilterComponent,
  ]
})
export class TaskListComponent implements OnInit, OnDestroy {
  private subTask = new Subscription();
  filteredTaskList$ = this.taskFilterService.filteredTaskList$;
  taskList$ = this.appFacadeService.taskList$.pipe(
    shareReplay()
  );
  selection = new SelectionModel<ITask>(true, []);
  filteredTaskList: ITask[] = [];
  displayedColumns = [
    'title',
    'status',
    'priority',
    'deadline',
    'implementer',
    'edit'
  ];

  constructor(
    private appFacadeService: AppFacadeService,
    private taskSortService: TaskSortService,
    private taskFilterService: TaskFilterService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subTask.add(
      this.taskList$.subscribe(taskList => {
        this.filteredTaskList = taskList;
        this.filteredTaskList$.next(taskList);
      })
    )
  }

  ngOnDestroy() {
    if(this.subTask) this.subTask.unsubscribe();
  }

  announceSortChange(event: { active: string; direction: 'asc' | 'desc' | ''}) {
    const sortItems = this.filteredTaskList;

    if (event.active === SortType.STATUS) {
      this.filteredTaskList$.next(this.taskSortService.sortByStatus(event, sortItems));
    }

    if (event.active === SortType.DEADLINE) {
      this.filteredTaskList$.next(this.taskSortService.sortByDeadline(event, sortItems))
    }

    if (event.active === SortType.IMPLEMENTER) {
      this.filteredTaskList$.next(this.taskSortService.sortByImplementer(event, sortItems))
    }
  }

  onOpenDialogEdit(evt: ITask) {
    this.appFacadeService.selectedTask(evt);

    const dialogRef = this.dialog.open(
      EditTaskComponent,
      {
        width: '35%'
      }
    );
  }
}
