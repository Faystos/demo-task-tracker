import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import {ITask, TaskPriority, TaskStatus} from "../../../../types/task.type";
import {AppFacadeService} from "../../../../store/state/app.facade.service";

@Component({
  templateUrl: 'dialog-add-new-tasks.component.html',
  styleUrls: ['dialog-add-new-tasks.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class DialogAddNewTasksComponent {
  readonly TaskPriority = TaskPriority;
  readonly TaskStatus = TaskStatus;

  formNewTask = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    deadline:  new FormControl('', [
      Validators.required
    ]),
    priority: new FormControl(TaskPriority.LOW),
    status: new FormControl({ value: TaskStatus.OPEN, disabled: true }),
    implementer: new FormControl('Василий Иванович'),
  });

  constructor(
    private appFacadeService: AppFacadeService,
    private dialog: MatDialog
  ) {}

  onAddNewTask() {
    if (!this.formNewTask.valid) return;

    const newTask: ITask = {
      id:  `${Math.floor(Math.random() * 100 + 1)}`,
      title: this.formNewTask.value.title as string,
      description: this.formNewTask.value.description as string,
      deadline: new Date(this.formNewTask.value.deadline as string),
      priority: this.formNewTask.value.priority as TaskPriority,
      status: TaskStatus.OPEN,
      implementer: this.formNewTask.value.implementer as string
    };

    this.appFacadeService.addTaskList(newTask);
    this.appFacadeService.fetchTaskList();
    this.dialog.closeAll();
  }
}
