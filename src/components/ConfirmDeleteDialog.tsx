import type { Task } from '../types/task'

interface ConfirmDeleteDialogProps {
  task: Task | null
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDeleteDialog({ task, onCancel, onConfirm }: ConfirmDeleteDialogProps) {
  if (!task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-2xl bg-paper-raised p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-base font-semibold text-ink">Delete this task?</h2>
        <p className="mt-2 text-sm text-ink-soft">
          "{task.title}" will be permanently removed. This can't be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft hover:bg-line"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-overdue px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  )
}
