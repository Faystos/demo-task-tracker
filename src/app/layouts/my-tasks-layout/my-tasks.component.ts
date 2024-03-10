import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `<span>Тут будет компонент моих задач</span>`,
  selector: 'my-tasks-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTasksComponent {}
