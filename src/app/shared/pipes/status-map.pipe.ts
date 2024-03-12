import { Pipe, PipeTransform } from "@angular/core";
import { MapStatus, statusValue } from "../../types/status.type";


@Pipe({
  standalone: true,
  name: 'statusMap'
})
export class StatusMapPipe implements PipeTransform {
  transform(statusValue: statusValue): string {
    return MapStatus[statusValue];
  }
}
