import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  template: `<span>Тут будет компонент списка задач</span>`,
  selector: 'task-list-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {}
