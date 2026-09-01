import type { LucideIcon } from 'lucide-react'
import type { Task } from '../types/task'
import { TaskCard } from './TaskCard'
import { EmptyState } from './EmptyState'

interface TaskSectionProps {
  title: string
  icon: LucideIcon
  tasks: Task[]
  emptyTitle: string
  emptyDescription: string
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskSection({
  title,
  icon: Icon,
  tasks,
  emptyTitle,
  emptyDescription,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskSectionProps) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-ink-soft" strokeWidth={2} />
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">
          {title}
        </h2>
        <span className="rounded-full bg-line px-2 py-0.5 text-xs font-medium text-ink-soft">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <EmptyState icon={Icon} title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
