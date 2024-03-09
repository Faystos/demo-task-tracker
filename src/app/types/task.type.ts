export interface ITask {
  title: string,
  description: string,
  status: TaskStatus,
  implementer: string,
  priority: TaskPriority,
  deadline: Date
}

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  REVIEW = 'review',
  TESTING = 'testing',
  DONE = 'done'

}
