import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { first } from "rxjs";

import { MatDialog, MatDialogActions, MatDialogModule, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";

import { ITask, TaskPriority, TaskStatus } from "../../../../types/task.type";
import { AppFacadeService } from "../../../../store/state/app.facade.service";
import { StatusSelectComponent } from "../../../../shared/components/status-select/status-select.component";
import {
  ImplementerSelectComponent
} from "../../../../shared/components/implementer-select/implementer-select.component";

@Component({
  templateUrl: 'edit-task.component.html',
  styleUrls: ['edit-task.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    StatusSelectComponent,
    ImplementerSelectComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent {
  readonly TaskPriority = TaskPriority;
  readonly TaskStatus = TaskStatus;

  private task!: ITask;

  private task$ = this.appFacadeService.task$
    .pipe(first())
    .subscribe((value) => this.task = value as ITask);

  formEditTask = new FormGroup({
    title: new FormControl(this.task.title),
    description: new FormControl(this.task.description),
    deadline:  new FormControl({ value: new Date(this.task.deadline), disabled: true }),
    priority: new FormControl({ value: this.task.priority, disabled: true}),
    status: new FormControl(this.task.status),
    implementer: new FormControl(this.task.implementer),
  });

  constructor(
    private appFacadeService: AppFacadeService,
    private dialog: MatDialog
  ) {}

  saveEditTask() {
    const editTask: ITask = {
      ...this.task,
      status: this.formEditTask.value.status as TaskStatus,
      implementer: this.formEditTask.value.implementer as string
    }
    this.appFacadeService.patchTask(editTask);
    this.appFacadeService.fetchTaskList();
    this.appFacadeService.selectedTask(editTask);
    this.dialog.closeAll();
  }
}
