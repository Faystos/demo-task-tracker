import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { shareReplay } from "rxjs";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AppFacadeService } from "../../../../store/state/app.facade.service";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import { TaskComponent } from "../../../../shared/components/task/task.component";

@Component({
  selector: 'task-info-component',
  templateUrl: 'task-info.component.html',
  styleUrls: ['task-info.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TaskComponent
  ]
})
export class TaskInfoComponent {
  public task$ = this.appFacadeService.task$.pipe(shareReplay());
  constructor(
    private appFacadeService: AppFacadeService,
    private dialog: MatDialog
  ) {}

  onOpenEditDialog() {
    const dialogRef = this.dialog.open(
      EditTaskComponent,
      {
        width: '35%'
      }
    );
  }
}
