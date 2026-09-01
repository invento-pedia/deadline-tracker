import { useCallback, useMemo } from 'react'
import type { Task, TaskFormData } from '../types/task'
import { useLocalStorage } from './useLocalStorage'
import { isTaskArray } from '../utils/validation'
import { sampleTasks, USE_SAMPLE_DATA } from '../data/sampleTasks'
import { daysUntil, getDeadlineStatus, isWithinNextDays } from '../utils/deadline'

const STORAGE_KEY = 'deadline-tracker:tasks'

function generateId(): string {
  // crypto.randomUUID is supported in all modern browsers and needs no dependency.
  return crypto.randomUUID()
}

/**
 * Owns the task list and every operation that mutates it. Components never
 * touch LocalStorage or write raw state-update logic — they call these
 * functions instead. This keeps "business logic" (what a valid update looks
 * like) separate from "storage logic" (how it's persisted) and "UI"
 * (how it's displayed).
 */
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    STORAGE_KEY,
    USE_SAMPLE_DATA ? sampleTasks : [],
    isTaskArray
  )

  const addTask = useCallback((data: TaskFormData) => {
    const now = new Date().toISOString()
    const newTask: Task = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim(),
      deadlineDate: data.deadlineDate,
      deadlineTime: data.deadlineTime || undefined,
      priority: data.priority,
      category: data.category,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }
    setTasks((prev) => [...prev, newTask])
    return newTask
  }, [setTasks])

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: data.title.trim(),
              description: data.description.trim(),
              deadlineDate: data.deadlineDate,
              deadlineTime: data.deadlineTime || undefined,
              priority: data.priority,
              category: data.category,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    )
  }, [setTasks])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [setTasks])

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }, [setTasks])

  // Derived counts for the dashboard. useMemo avoids recalculating on every
  // render unless the task list actually changes.
  const stats = useMemo(() => {
    const active = tasks.filter((t) => !t.completed)
    return {
      total: active.length,
      dueToday: active.filter((t) => getDeadlineStatus(t) === 'today').length,
      dueThisWeek: active.filter((t) => isWithinNextDays(t, 7)).length,
      overdue: active.filter((t) => getDeadlineStatus(t) === 'overdue').length,
      completed: tasks.length - active.length,
    }
  }, [tasks])

  const grouped = useMemo(() => {
    const today: Task[] = []
    const upcoming: Task[] = []
    const overdue: Task[] = []
    const completed: Task[] = []

    for (const task of tasks) {
      const status = getDeadlineStatus(task)
      if (status === 'completed') completed.push(task)
      else if (status === 'overdue') overdue.push(task)
      else if (status === 'today') today.push(task)
      else upcoming.push(task)
    }

    const byDeadline = (a: Task, b: Task) => daysUntil(a) - daysUntil(b)
    today.sort(byDeadline)
    upcoming.sort(byDeadline)
    overdue.sort(byDeadline)
    completed.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

    return { today, upcoming, overdue, completed }
  }, [tasks])

  return { tasks, addTask, updateTask, deleteTask, toggleComplete, stats, grouped }
}
