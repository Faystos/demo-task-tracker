import { Pipe, PipeTransform } from "@angular/core";
import { ITask, TaskStatus } from "../../../types/task.type";

@Pipe({
  standalone: true,
  name: 'filterTask'
})
export class FilterPipe implements PipeTransform  {
  transform(tasks: ITask[] | null, trigger: TaskStatus): ITask[] {
    return !tasks ? [] : [...tasks.filter(value => value.status === trigger)];
  }
}
