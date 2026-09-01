import type { Task } from '../types/task'

/**
 * Sample data for local development/demo only.
 *
 * To turn this off, set USE_SAMPLE_DATA to false below, or just clear
 * LocalStorage — sample data is only ever loaded once, the first time the
 * app runs with no existing "deadline-tracker:tasks" key.
 */
export const USE_SAMPLE_DATA = true

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const now = new Date().toISOString()

export const sampleTasks: Task[] = [
  {
    id: 'sample-1',
    title: 'Submit Data Structures assignment',
    description: 'Upload the balanced BST implementation and writeup to the course portal.',
    deadlineDate: daysFromNow(0),
    deadlineTime: '23:59',
    priority: 'High',
    category: 'Assignment',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-2',
    title: 'Dentist appointment',
    description: 'Annual checkup, downtown clinic.',
    deadlineDate: daysFromNow(1),
    deadlineTime: '10:30',
    priority: 'Medium',
    category: 'Appointment',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-3',
    title: 'Database systems midterm',
    description: 'Covers normalization, indexing, and query optimization.',
    deadlineDate: daysFromNow(5),
    priority: 'High',
    category: 'Exam',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-4',
    title: 'Capstone project proposal',
    description: 'Draft the proposal doc and share with the team for feedback.',
    deadlineDate: daysFromNow(9),
    priority: 'Medium',
    category: 'Project',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-5',
    title: 'Renew gym membership',
    description: '',
    deadlineDate: daysFromNow(-2),
    priority: 'Low',
    category: 'Personal',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-6',
    title: 'Read chapter 4 for seminar',
    description: 'Notes due before Thursday discussion.',
    deadlineDate: daysFromNow(-5),
    priority: 'Medium',
    category: 'Assignment',
    completed: true,
    createdAt: now,
    updatedAt: now,
  },
]
