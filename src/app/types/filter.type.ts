export interface IFilterType {
  status: string;
  implementer: string;
  deadline: Date | null;
}

export enum SortType {
  STATUS =  'status',
  IMPLEMENTER = 'implementer',
  DEADLINE = 'deadline'
}
