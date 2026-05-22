// src/pages/AchievementPage.tsx
import { useDogStore } from '../store/useDogStore'

export default function AchievementPage() {
  const allAchievements = useDogStore((state) => state.achievements)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section>
        <p className="text-sm font-medium text-[#5f7a72]">Achievements</p>
        <h2 className="mt-2 text-3xl font-bold text-[#2f4540]">
          처음의 순간들
        </h2>
        <p className="mt-3 text-stone-600">
          작지만 소중한 적응의 신호를 차곡차곡 모아봐요.
        </p>
      </section>

      <section className="grid gap-4">
        {allAchievements.map((achievement) => {
          const unlocked = Boolean(achievement.unlockedAt)

          return (
            <article
              key={achievement.id}
              className={[
                'rounded-[28px] p-5 shadow-md shadow-stone-200/40',
                unlocked ? 'bg-white' : 'bg-[#eef2f1] opacity-70',
              ].join(' ')}
            >
              <div className="flex items-start gap-4 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf5f3] text-2xl">
                  {unlocked ? '🏆' : '🔒'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#2f4540]">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {achievement.description}
                  </p>
                  {achievement.unlockedAt && (
                    <p className="mt-2 text-xs text-[#5f7a72]">
                      달성일:{' '}
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
