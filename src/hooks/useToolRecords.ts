import { useState, useEffect, useCallback, useMemo } from "react"
import type {
  IToolRecords,
  IABCRecord,
  IDissonanceCheck,
  IObedienceDefense,
  IBiasPractice,
} from "@/types"

const STORAGE_KEY = "__app_psychology_rpg_tool_records"

const DEFAULT_RECORDS: IToolRecords = {
  abcRecords: [],
  dissonanceChecks: [],
  obedienceDefenses: [],
  biasPractices: [],
}

function loadRecords(): IToolRecords {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_RECORDS }
    const parsed = JSON.parse(raw) as Partial<IToolRecords>
    return { ...DEFAULT_RECORDS, ...parsed }
  } catch {
    return { ...DEFAULT_RECORDS }
  }
}

function saveRecords(records: IToolRecords) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch {
    // ignore
  }
}

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export interface ToolRecordsAPI {
  records: IToolRecords
  addABCRecord: (data: Omit<IABCRecord, "id" | "createdAt">) => void
  addDissonanceCheck: (data: Omit<IDissonanceCheck, "id" | "createdAt">) => void
  addObedienceDefense: (data: Omit<IObedienceDefense, "id" | "createdAt">) => void
  addBiasPractice: (data: Omit<IBiasPractice, "id" | "createdAt">) => void
  deleteABCRecord: (id: string) => void
  deleteDissonanceCheck: (id: string) => void
  deleteObedienceDefense: (id: string) => void
  deleteBiasPractice: (id: string) => void
}

export function useToolRecords(): ToolRecordsAPI {
  const [records, setRecords] = useState<IToolRecords>(loadRecords)

  useEffect(() => {
    saveRecords(records)
  }, [records])

  const addABCRecord = useCallback((data: Omit<IABCRecord, "id" | "createdAt">) => {
    setRecords((prev) => ({
      ...prev,
      abcRecords: [{ ...data, id: genId(), createdAt: Date.now() }, ...prev.abcRecords],
    }))
  }, [])

  const addDissonanceCheck = useCallback((data: Omit<IDissonanceCheck, "id" | "createdAt">) => {
    setRecords((prev) => ({
      ...prev,
      dissonanceChecks: [{ ...data, id: genId(), createdAt: Date.now() }, ...prev.dissonanceChecks],
    }))
  }, [])

  const addObedienceDefense = useCallback((data: Omit<IObedienceDefense, "id" | "createdAt">) => {
    setRecords((prev) => ({
      ...prev,
      obedienceDefenses: [{ ...data, id: genId(), createdAt: Date.now() }, ...prev.obedienceDefenses],
    }))
  }, [])

  const addBiasPractice = useCallback((data: Omit<IBiasPractice, "id" | "createdAt">) => {
    setRecords((prev) => ({
      ...prev,
      biasPractices: [{ ...data, id: genId(), createdAt: Date.now() }, ...prev.biasPractices],
    }))
  }, [])

  const deleteABCRecord = useCallback((id: string) => {
    setRecords((prev) => ({
      ...prev,
      abcRecords: prev.abcRecords.filter((r) => r.id !== id),
    }))
  }, [])

  const deleteDissonanceCheck = useCallback((id: string) => {
    setRecords((prev) => ({
      ...prev,
      dissonanceChecks: prev.dissonanceChecks.filter((r) => r.id !== id),
    }))
  }, [])

  const deleteObedienceDefense = useCallback((id: string) => {
    setRecords((prev) => ({
      ...prev,
      obedienceDefenses: prev.obedienceDefenses.filter((r) => r.id !== id),
    }))
  }, [])

  const deleteBiasPractice = useCallback((id: string) => {
    setRecords((prev) => ({
      ...prev,
      biasPractices: prev.biasPractices.filter((r) => r.id !== id),
    }))
  }, [])

  return useMemo(() => ({
    records,
    addABCRecord,
    addDissonanceCheck,
    addObedienceDefense,
    addBiasPractice,
    deleteABCRecord,
    deleteDissonanceCheck,
    deleteObedienceDefense,
    deleteBiasPractice,
  }), [records, addABCRecord, addDissonanceCheck, addObedienceDefense, addBiasPractice, deleteABCRecord, deleteDissonanceCheck, deleteObedienceDefense, deleteBiasPractice])
}
