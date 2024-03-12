import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

import { ITask } from "../../../types/task.type";
import { StatusMapPipe } from "../../pipes/status-map.pipe";
import { PriorityMapPipe } from "../../pipes/priority-map.pipe";

@Component({
  selector: 'task-component',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    StatusMapPipe,
    PriorityMapPipe,
  ]
})
export class TaskComponent {
  private _task!: ITask;
  @Input() set task(value: ITask | null) {
    if (!value) return;
    this._task = value;
  }

  get task() {
    return this._task;
  }
}
