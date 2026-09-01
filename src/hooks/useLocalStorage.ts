import { useEffect, useState } from 'react'

/**
 * A generic hook that syncs a piece of React state with LocalStorage.
 *
 * Why a hook instead of calling localStorage directly in components:
 * - One place handles JSON.parse/stringify and error handling.
 * - Components just use it like useState — they don't know or care that
 *   persistence is happening underneath.
 * - `validate` lets callers reject corrupted/malformed stored data instead
 *   of trusting it blindly (see requirement #10, error handling).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue

      const parsed = JSON.parse(raw)
      if (validate && !validate(parsed)) {
        console.warn(`useLocalStorage: stored value for "${key}" failed validation, using default.`)
        return initialValue
      }
      return parsed as T
    } catch (error) {
      console.warn(`useLocalStorage: could not read "${key}", using default.`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Most likely quota exceeded, or storage disabled (e.g. private browsing).
      console.error(`useLocalStorage: could not write "${key}".`, error)
    }
  }, [key, value])

  return [value, setValue]
}
