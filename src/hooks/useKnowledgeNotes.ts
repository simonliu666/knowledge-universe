import { useState, useEffect, useCallback, useMemo } from "react"
import type { IKnowledgeNote, IQARecord } from "@/types"

const STORAGE_KEY = "__app_psychology_rpg_notes"
const QA_STORAGE_KEY = "__app_psychology_rpg_qa_records"

function loadNotes(): IKnowledgeNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as IKnowledgeNote[]
  } catch {
    return []
  }
}

function saveNotes(notes: IKnowledgeNote[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // ignore
  }
}

function loadQARecords(): IQARecord[] {
  try {
    const raw = localStorage.getItem(QA_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as IQARecord[]
  } catch {
    return []
  }
}

function saveQARecords(records: IQARecord[]) {
  try {
    localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(records))
  } catch {
    // ignore
  }
}

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export interface KnowledgeNotesAPI {
  notes: IKnowledgeNote[]
  qaRecords: IQARecord[]
  getNotesByPoint: (pointId: string) => IKnowledgeNote[]
  getQAByPoint: (pointId: string) => IQARecord[]
  addNote: (pointId: string, content: string) => void
  addQARecord: (pointId: string, pointName: string, question: string, answer: string) => void
  deleteNote: (id: string) => void
  deleteQARecord: (id: string) => void
}

export function useKnowledgeNotes(): KnowledgeNotesAPI {
  const [notes, setNotes] = useState<IKnowledgeNote[]>(loadNotes)
  const [qaRecords, setQARecords] = useState<IQARecord[]>(loadQARecords)

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  useEffect(() => {
    saveQARecords(qaRecords)
  }, [qaRecords])

  const getNotesByPoint = useCallback(
    (pointId: string) => notes.filter((n) => n.pointId === pointId),
    [notes]
  )

  const getQAByPoint = useCallback(
    (pointId: string) => qaRecords.filter((q) => q.pointId === pointId),
    [qaRecords]
  )

  const addNote = useCallback((pointId: string, content: string) => {
    if (!content.trim()) return
    setNotes((prev) => [
      { id: genId(), pointId, content: content.trim(), createdAt: Date.now() },
      ...prev,
    ])
  }, [])

  const addQARecord = useCallback(
    (pointId: string, pointName: string, question: string, answer: string) => {
      if (!question.trim() || !answer.trim()) return
      setQARecords((prev) => [
        {
          id: genId(),
          pointId,
          pointName,
          question: question.trim(),
          answer: answer.trim(),
          createdAt: Date.now(),
        },
        ...prev,
      ])
    },
    []
  )

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const deleteQARecord = useCallback((id: string) => {
    setQARecords((prev) => prev.filter((q) => q.id !== id))
  }, [])

  return useMemo(() => ({
    notes,
    qaRecords,
    getNotesByPoint,
    getQAByPoint,
    addNote,
    addQARecord,
    deleteNote,
    deleteQARecord,
  }), [notes, qaRecords, getNotesByPoint, getQAByPoint, addNote, addQARecord, deleteNote, deleteQARecord])
}
