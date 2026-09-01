import type { Task, TaskFilters, Priority } from '../types/task'
import { getDeadlineDateTime } from './deadline'

const PRIORITY_WEIGHT: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 }

export function filterAndSortTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const query = filters.search.trim().toLowerCase()

  const filtered = tasks.filter((task) => {
    if (filters.category !== 'All' && task.category !== filters.category) return false
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false
    if (filters.completion === 'Active' && task.completed) return false
    if (filters.completion === 'Completed' && !task.completed) return false
    if (query) {
      const haystack = `${task.title} ${task.description}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === 'priority') {
      return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
    }
    const diff = getDeadlineDateTime(a).getTime() - getDeadlineDateTime(b).getTime()
    return filters.sort === 'deadline-desc' ? -diff : diff
  })

  return sorted
}
