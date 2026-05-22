// src/components/DebugStore.tsx
import { useDogStore } from '../store/useDogStore'

export default function DebugStore() {
  // Zustand store 상태 가져오기
  const dogProfile = useDogStore((state) => state.dogProfile)
  const checkIns = useDogStore((state) => state.checkIns)
  const achievements = useDogStore((state) => state.achievements)
  const unlockedAchievements = useDogStore((state) => state.unlockedAchievements)

  return (
    <div
      style={{
        background: '#f0f0f0',
        padding: '1rem',
        fontSize: '12px',
        borderRadius: '8px',
        marginTop: '1rem',
      }}
    >
      <h3>Debug Zustand Store</h3>

      <div>
        <strong>dogProfile:</strong>
        <pre>{JSON.stringify(dogProfile, null, 2)}</pre>
      </div>

      <div>
        <strong>checkIns:</strong>
        <pre>{JSON.stringify(checkIns, null, 2)}</pre>
      </div>

      <div>
        <strong>achievements:</strong>
        <pre>{JSON.stringify(achievements, null, 2)}</pre>
      </div>

      <div>
        <strong>unlockedAchievements:</strong>
        <pre>{JSON.stringify(unlockedAchievements, null, 2)}</pre>
      </div>
    </div>
  )
}