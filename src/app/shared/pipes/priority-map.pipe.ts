import { Pipe, PipeTransform } from "@angular/core";
import { MapPriority, priorityValue } from "../../types/priority.type";

@Pipe({
  standalone: true,
  name: 'priorityMap'
})
export class PriorityMapPipe implements PipeTransform {
  transform(priorityValue: priorityValue): string {
    return MapPriority[priorityValue];
  }
}
