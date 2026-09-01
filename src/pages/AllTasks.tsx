import { useMemo, useState } from 'react'
import { ListTodo } from 'lucide-react'
import type { Task } from '../types/task'
import { DEFAULT_FILTERS } from '../types/task'
import { useTasks } from '../hooks/useTasks'
import { FilterBar } from '../components/FilterBar'
import { TaskCard } from '../components/TaskCard'
import { EmptyState } from '../components/EmptyState'
import { filterAndSortTasks } from '../utils/filterTasks'

interface AllTasksProps {
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function AllTasks({ onEdit, onDelete }: AllTasksProps) {
  const { tasks, toggleComplete } = useTasks()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const visibleTasks = useMemo(() => filterAndSortTasks(tasks, filters), [tasks, filters])

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6">
      <FilterBar filters={filters} onChange={setFilters} />

      {visibleTasks.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="No matching tasks"
          description="Try adjusting your filters or search terms."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
