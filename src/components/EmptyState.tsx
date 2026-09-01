import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line px-6 py-10 text-center">
      <Icon className="h-6 w-6 text-ink-soft" strokeWidth={1.5} />
      <p className="font-display text-sm font-semibold text-ink">{title}</p>
      <p className="max-w-xs text-sm text-ink-soft">{description}</p>
    </div>
  )
}
