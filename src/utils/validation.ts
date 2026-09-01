import { CATEGORIES, PRIORITIES, type Task, type TaskFormData } from '../types/task'

/**
 * Runtime check that an unknown value (e.g. parsed straight out of
 * LocalStorage) actually looks like Task[]. TypeScript types disappear at
 * runtime, so if something else wrote garbage into the same storage key,
 * or an old version of the app used a different shape, this stops the
 * bad data from reaching the UI and crashing it.
 */
export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask)
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.description === 'string' &&
    typeof t.deadlineDate === 'string' &&
    !Number.isNaN(new Date(t.deadlineDate as string).getTime()) &&
    (t.deadlineTime === undefined || typeof t.deadlineTime === 'string') &&
    PRIORITIES.includes(t.priority as never) &&
    CATEGORIES.includes(t.category as never) &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'string' &&
    typeof t.updatedAt === 'string'
  )
}

export interface FormErrors {
  title?: string
  deadlineDate?: string
  deadlineTime?: string
}

/** Validates the Add/Edit Task form. Returns an empty object when valid. */
export function validateTaskForm(data: TaskFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.title.trim()) {
    errors.title = 'Title is required.'
  } else if (data.title.trim().length > 120) {
    errors.title = 'Title must be 120 characters or fewer.'
  }

  if (!data.deadlineDate) {
    errors.deadlineDate = 'Deadline date is required.'
  } else if (Number.isNaN(new Date(data.deadlineDate).getTime())) {
    errors.deadlineDate = 'That date is not valid.'
  }

  if (data.deadlineTime && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(data.deadlineTime)) {
    errors.deadlineTime = 'That time is not valid.'
  }

  return errors
}
