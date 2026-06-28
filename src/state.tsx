import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { LadderLevel } from './data/types'

/** Post-session reflection captured on the Reflection page (in memory only). */
export interface Reflection {
  themeId: string | null
  whatWorked: string
  levelsJoined: LadderLevel[]
  toImprove: string
}

const emptyReflection: Reflection = {
  themeId: null,
  whatWorked: '',
  levelsJoined: [],
  toImprove: '',
}

interface AppState {
  selectedThemeId: string | null
  setSelectedThemeId: (id: string | null) => void
  reflection: Reflection
  setReflection: (r: Reflection) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  const [reflection, setReflection] = useState<Reflection>(emptyReflection)

  const value = useMemo(
    () => ({ selectedThemeId, setSelectedThemeId, reflection, setReflection }),
    [selectedThemeId, reflection],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
