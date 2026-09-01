/**
 * Core data model for the app.
 *
 * Design decision: we do NOT store a `status` field (e.g. "overdue", "today").
 * Status is always derived from `deadline` + `completed` at render time,
 * using the functions in src/utils/deadline.ts. This avoids the classic bug
 * where stored status goes stale (e.g. a task stays "Upcoming" forever
 * because nothing updated it after midnight passed).
 */

export type Priority = 'Low' | 'Medium' | 'High'

export type Category =
  | 'Assignment'
  | 'Project'
  | 'Exam'
  | 'Appointment'
  | 'Personal'
  | 'Other'

export interface Task {
  id: string
  title: string
  description: string
  /** ISO date string, e.g. "2026-08-25" */
  deadlineDate: string
  /** Optional 24h time string, e.g. "14:30". Undefined = "all day" deadline. */
  deadlineTime?: string
  priority: Priority
  category: Category
  completed: boolean
  createdAt: string
  updatedAt: string
}

/** Shape of the form used to create/edit a task, before it becomes a Task. */
export interface TaskFormData {
  title: string
  description: string
  deadlineDate: string
  deadlineTime: string
  priority: Priority
  category: Category
}

/** The derived, display-facing status of a task. */
export type DeadlineStatus =
  | 'overdue'
  | 'today'
  | 'tomorrow'
  | 'upcoming'
  | 'completed'

export const PRIORITIES: Priority[] = ['Low', 'Medium', 'High']

export const CATEGORIES: Category[] = [
  'Assignment',
  'Project',
  'Exam',
  'Appointment',
  'Personal',
  'Other',
]

export type SortOption = 'deadline-asc' | 'deadline-desc' | 'priority'

export interface TaskFilters {
  category: Category | 'All'
  priority: Priority | 'All'
  completion: 'All' | 'Active' | 'Completed'
  search: string
  sort: SortOption
}

export const DEFAULT_FILTERS: TaskFilters = {
  category: 'All',
  priority: 'All',
  completion: 'All',
  search: '',
  sort: 'deadline-asc',
}
