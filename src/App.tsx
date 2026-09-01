import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { AllTasks } from './pages/AllTasks'
import { TaskFormModal } from './components/TaskFormModal'
import { ConfirmDeleteDialog } from './components/ConfirmDeleteDialog'
import { useTasks } from './hooks/useTasks'
import type { Task, TaskFormData } from './types/task'

/**
 * App owns the pieces of state that are shared across pages: which modal
 * is open, and which task (if any) is being edited or deleted. The actual
 * task data and CRUD operations live in useTasks, called once here and
 * passed down — but note Dashboard/AllTasks also call useTasks()
 * themselves. Because useTasks reads from the same LocalStorage key,
 * every call site stays in sync; this keeps prop-drilling minimal without
 * reaching for a global state library, which this app doesn't need.
 */
function App() {
  const { addTask, updateTask, deleteTask } = useTasks()

  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  function openAddForm() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEditForm(task: Task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  function handleFormSubmit(data: TaskFormData) {
    if (editingTask) {
      updateTask(editingTask.id, data)
    } else {
      addTask(data)
    }
    setFormOpen(false)
    setEditingTask(null)
  }

  function handleConfirmDelete() {
    if (deletingTask) {
      deleteTask(deletingTask.id)
      setDeletingTask(null)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header onAddTask={openAddForm} />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard onEdit={openEditForm} onDelete={setDeletingTask} />} />
          <Route path="/tasks" element={<AllTasks onEdit={openEditForm} onDelete={setDeletingTask} />} />
        </Routes>
      </main>

      <TaskFormModal
        open={formOpen}
        taskToEdit={editingTask}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        task={deletingTask}
        onCancel={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default App
