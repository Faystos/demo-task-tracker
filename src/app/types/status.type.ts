import { TaskStatus } from "./task.type";

export interface IStatus {
  name: TaskStatus;
  displayName: string;
}

export enum MapStatus {
  'open' = 'Нужно сделать',
  'in progress' = 'В работе',
  'review' = 'Ревью',
  'testing' = 'На тестировании',
  'done' = 'Выполнено'
}

export type statusValue = 'open' | 'in progress' | 'review' | 'testing' | 'done';
