import { Check, Pencil, Trash2, Undo2 } from 'lucide-react'
import type { Task } from '../types/task'
import { StatusBadge } from './StatusBadge'
import { PriorityPill } from './PriorityPill'
import { formatDeadline, getDeadlineStatus } from '../utils/deadline'

const EDGE_COLOR: Record<string, string> = {
  overdue: 'border-l-overdue',
  today: 'border-l-today',
  tomorrow: 'border-l-tomorrow',
  upcoming: 'border-l-upcoming',
  completed: 'border-l-completed',
}

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const status = getDeadlineStatus(task)

  return (
    <div
      className={`group flex items-start gap-3 rounded-xl border border-line border-l-4 bg-paper-raised p-4 shadow-sm transition-colors ${EDGE_COLOR[status]} ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => onToggleComplete(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          task.completed
            ? 'border-completed bg-completed text-white'
            : 'border-line text-transparent hover:border-brand'
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-display text-sm font-semibold text-ink ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <StatusBadge task={task} />
          <PriorityPill priority={task.priority} />
          <span className="text-xs text-ink-soft">{task.category}</span>
        </div>

        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{task.description}</p>
        )}

        <p className="mt-2 text-xs font-medium text-ink-soft">{formatDeadline(task)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          className="rounded-md p-1.5 text-ink-soft hover:bg-brand-soft hover:text-brand"
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? <Undo2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
        </button>
        <button
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="rounded-md p-1.5 text-ink-soft hover:bg-brand-soft hover:text-brand"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          className="rounded-md p-1.5 text-ink-soft hover:bg-overdue-soft hover:text-overdue"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
