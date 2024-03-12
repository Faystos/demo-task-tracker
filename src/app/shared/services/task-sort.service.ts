import { Injectable } from "@angular/core";
import {ITask, TaskStatus} from "../../types/task.type";

export interface SortSetting {
  active: string;
  direction: 'asc' | 'desc' | '';
}

export enum SortSettingDirection {
  ASC = 'asc',
  DESC = 'desc'
}

@Injectable({ providedIn: "root" })
export class TaskSortService {

  status = {
    'open': 1,
    'in progress': 2,
    'review': 3,
    'testing': 4,
    'done': 5
  };

  sortByStatus(sortSetting: SortSetting, sortItems: ITask[]) {
    let sortedArrayByStatus: ITask[] = [];
    let sortArray = [...sortItems];

    if (sortSetting.direction === SortSettingDirection.ASC) {
      sortedArrayByStatus = sortArray.sort((taskA, taskB) => this.status[taskA.status] - this.status[taskB.status]);
    }

    if (sortSetting.direction === SortSettingDirection.DESC) {
      sortedArrayByStatus = sortArray.sort((taskA, taskB) => this.status[taskB.status] - this.status[taskA.status]);
    }

    if (sortSetting.direction === '') {
      sortedArrayByStatus = sortArray;
    }

    return sortedArrayByStatus;
  }

  sortByDeadline(sortSetting: SortSetting, sortItems: ITask[]) {
    let sortedArrayByDeadline: ITask[] = [];
    let sortArray = [...sortItems];

    if (sortSetting.direction === SortSettingDirection.ASC) {
      sortedArrayByDeadline = sortArray.sort((taskA, taskB) =>
        (Number(new Date(taskA.deadline)) - Number(new Date(taskB.deadline))));
    }

    if (sortSetting.direction === SortSettingDirection.DESC) {
      sortedArrayByDeadline = sortArray.sort((taskA, taskB) =>
        (Number(new Date(taskB.deadline)) - Number(new Date(taskA.deadline))));
    }

    if (sortSetting.direction === '') {
      sortedArrayByDeadline = sortArray;
    }

    return sortedArrayByDeadline;
  }

  sortByImplementer(sortSetting: SortSetting, sortItems: ITask[]) {
    let sortedArrayByImplementer: ITask[] = [];
    let sortArray = [...sortItems];

    if (sortSetting.direction === SortSettingDirection.ASC) {
      sortedArrayByImplementer = sortArray.sort((taskA, taskB) => {
        if(taskA.implementer.split(' ')[0].toLowerCase() > taskB.implementer.split(' ')[0].toLowerCase()) return 1;

        return 0;
      });

    }

    if (sortSetting.direction === SortSettingDirection.DESC) {
      sortedArrayByImplementer = sortArray.sort((taskA, taskB) => {
        if(taskA.implementer.split(' ')[0].toLowerCase() < taskB.implementer.split(' ')[0].toLowerCase()) return -1;

        return 0;
      });

    }

    if (sortSetting.direction === '') {
      sortedArrayByImplementer = sortArray;
    }

    return sortedArrayByImplementer;
  }
}
