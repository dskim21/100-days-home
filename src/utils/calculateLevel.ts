import { levels } from '../constants/levels'

export function calculateTotalScore(
  checkIns: { score: number }[]
) {
  const total = checkIns.reduce(
    (sum, checkIn) =>
      sum + checkIn.score,
    0
  )

  return Math.max(total, 0)
}

export function getCurrentLevel(
  totalScore: number
) {
  return (
    levels.find(
      (level) =>
        totalScore >=
          level.minScore &&
        totalScore <=
          level.maxScore
    ) ?? levels[0]
  )
}