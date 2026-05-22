import type { Emotion } from '../types'

export const emotions: {
  value: Emotion
  label: string
  emoji: string
}[] = [
  { value: 'stable', label: '안정', emoji: '🙂' },
  { value: 'tense', label: '긴장', emoji: '😐' },
  { value: 'anxious', label: '불안', emoji: '😟' },
  { value: 'active', label: '활발', emoji: '😄' },
  { value: 'tired', label: '무기력', emoji: '😴' },
]
