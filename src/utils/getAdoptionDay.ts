export function getAdoptionDay(adoptionDate?: string, targetDate?: string) {
  if (!adoptionDate) return 0

  const adoption = new Date(adoptionDate)
  const target = targetDate ? new Date(targetDate) : new Date()

  if (isNaN(adoption.getTime()) || isNaN(target.getTime())) return 0

  const adoptionUTC = Date.UTC(
    adoption.getFullYear(),
    adoption.getMonth(),
    adoption.getDate(),
  )
  const targetUTC = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  )

  const diffTime = targetUTC - adoptionUTC
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(diffDays + 1, 1)
}
