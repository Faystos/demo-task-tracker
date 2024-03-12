import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ITask } from "../../types/task.type";
import { IFilterType } from "../../types/filter.type";

@Injectable({ providedIn: "root" })
export class TaskFilterService {
  filteredTaskList$ = new BehaviorSubject<ITask[]>([]);

  filteringTaskList(taskList: ITask[], valueFilter: IFilterType) {
    let filterTaskList: ITask[] = [...taskList];

    if (valueFilter.status && valueFilter.status.length) {
      filterTaskList = this.taskFilterByStatus(filterTaskList, valueFilter.status);
    }

    if (valueFilter.implementer && valueFilter.implementer.length) {
      filterTaskList = this.taskFilterByImplementer(filterTaskList, valueFilter.implementer);
    }

    if (valueFilter.deadline) {
      filterTaskList = this.taskFilterByImpDeadline(filterTaskList, valueFilter.deadline);
    }

    this.filteredTaskList$.next(filterTaskList);
  }

  private taskFilterByStatus(arrayTask: ITask[], trigger: string) {
    return arrayTask.filter((task) => task.status === trigger);
  }

  private taskFilterByImplementer(arrayTask: ITask[], trigger: string) {
    return arrayTask.filter((task) => task.implementer.toLowerCase()
      .includes((trigger).toLowerCase())
    );
  }

  private taskFilterByImpDeadline(arrayTask: ITask[], trigger: Date) {
    return  arrayTask.filter((task) => {
      return new Date(task.deadline).getTime() === new Date(trigger).getTime()
    });
  }
}
