import { AlarmClock, CalendarCheck, CalendarClock, CalendarRange, CheckCircle2 } from 'lucide-react'
import type { Task } from '../types/task'
import { useTasks } from '../hooks/useTasks'
import { StatCard } from '../components/StatCard'
import { TaskSection } from '../components/TaskSection'

interface DashboardProps {
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function Dashboard({ onEdit, onDelete }: DashboardProps) {
  const { stats, grouped, toggleComplete } = useTasks()

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard label="Active tasks" value={stats.total} icon={CalendarRange} accent="brand" />
        <StatCard label="Due today" value={stats.dueToday} icon={AlarmClock} accent="today" />
        <StatCard label="Due this week" value={stats.dueThisWeek} icon={CalendarClock} accent="brand" />
        <StatCard label="Overdue" value={stats.overdue} icon={CalendarCheck} accent="overdue" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} accent="completed" />
      </div>

      <TaskSection
        title="Overdue"
        icon={AlarmClock}
        tasks={grouped.overdue}
        emptyTitle="Nothing overdue"
        emptyDescription="You're caught up — no missed deadlines right now."
        onToggleComplete={toggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskSection
        title="Today"
        icon={CalendarCheck}
        tasks={grouped.today}
        emptyTitle="No tasks today"
        emptyDescription="Nothing due today. Add a task or check what's upcoming."
        onToggleComplete={toggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskSection
        title="Upcoming"
        icon={CalendarRange}
        tasks={grouped.upcoming}
        emptyTitle="No upcoming tasks"
        emptyDescription="Your schedule is clear for now."
        onToggleComplete={toggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskSection
        title="Completed"
        icon={CheckCircle2}
        tasks={grouped.completed}
        emptyTitle="Nothing completed yet"
        emptyDescription="Finished tasks will show up here."
        onToggleComplete={toggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}
