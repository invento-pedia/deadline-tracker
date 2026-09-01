import { useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES, PRIORITIES, type Task, type TaskFormData } from '../types/task'
import { validateTaskForm, type FormErrors } from '../utils/validation'

const EMPTY_FORM: TaskFormData = {
  title: '',
  description: '',
  deadlineDate: '',
  deadlineTime: '',
  priority: 'Medium',
  category: 'Assignment',
}

function taskToFormData(task: Task): TaskFormData {
  return {
    title: task.title,
    description: task.description,
    deadlineDate: task.deadlineDate,
    deadlineTime: task.deadlineTime ?? '',
    priority: task.priority,
    category: task.category,
  }
}

interface TaskFormModalProps {
  open: boolean
  taskToEdit: Task | null
  onClose: () => void
  onSubmit: (data: TaskFormData) => void
}

/**
 * Thin wrapper that decides whether to render the modal at all. The actual
 * form is a separate component, remounted via `key` whenever the modal
 * opens for a different task. That gives us a fresh form state "for free"
 * on open, without an effect that calls setState (React docs recommend
 * against synchronizing state this way — it causes an extra render).
 */
export function TaskFormModal({ open, taskToEdit, onClose, onSubmit }: TaskFormModalProps) {
  if (!open) return null
  return (
    <TaskForm
      key={taskToEdit?.id ?? 'new'}
      taskToEdit={taskToEdit}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  )
}

function TaskForm({
  taskToEdit,
  onClose,
  onSubmit,
}: Omit<TaskFormModalProps, 'open'>) {
  const [form, setForm] = useState<TaskFormData>(taskToEdit ? taskToFormData(taskToEdit) : EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validateTaskForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-paper-raised shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-base font-semibold text-ink">
            {taskToEdit ? 'Edit task' : 'Add a new task'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-ink-soft hover:bg-line"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Submit lab report"
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
            {errors.title && <p className="mt-1 text-xs text-overdue">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink">
              Description <span className="font-normal text-ink-soft">(optional)</span>
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="Any extra detail worth remembering"
              className="w-full resize-none rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="deadlineDate" className="mb-1 block text-sm font-medium text-ink">
                Deadline date
              </label>
              <input
                id="deadlineDate"
                type="date"
                value={form.deadlineDate}
                onChange={(e) => setForm({ ...form, deadlineDate: e.target.value })}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand"
              />
              {errors.deadlineDate && <p className="mt-1 text-xs text-overdue">{errors.deadlineDate}</p>}
            </div>
            <div>
              <label htmlFor="deadlineTime" className="mb-1 block text-sm font-medium text-ink">
                Time <span className="font-normal text-ink-soft">(optional)</span>
              </label>
              <input
                id="deadlineTime"
                type="time"
                value={form.deadlineTime}
                onChange={(e) => setForm({ ...form, deadlineTime: e.target.value })}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand"
              />
              {errors.deadlineTime && <p className="mt-1 text-xs text-overdue">{errors.deadlineTime}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="priority" className="mb-1 block text-sm font-medium text-ink">
                Priority
              </label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as TaskFormData['priority'] })}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-ink">
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as TaskFormData['category'] })}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft hover:bg-line"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {taskToEdit ? 'Save changes' : 'Add task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
