import { useDogStore } from '../store/useDogStore'
import {
  calculateTotalScore,
  getCurrentLevel,
} from '../utils/calculateLevel'
import { getAdoptionDay } from '../utils/getAdoptionDay'
import { generateCoachMessage } from '../utils/generateCoachMessage'

export default function HomePage() {
  const dogProfile = useDogStore((state) => state.dogProfile)
  const checkIns = useDogStore((state) => state.checkIns)
  const unlockedAchievements = useDogStore(
    (state) => state.unlockedAchievements,
  )

  const totalScore = calculateTotalScore(checkIns)
  const currentLevel = getCurrentLevel(totalScore)
  const adoptionDay = getAdoptionDay(dogProfile?.adoptionDate)
  const progress = Math.min((adoptionDay / 100) * 100, 100)
  const coachMessage = generateCoachMessage(checkIns)

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#c7ddd3] via-[#d9ebe4] to-[#edf5f3] p-7 shadow-lg shadow-[#c7ddd3]/30">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
            🐶
          </div>
          <p className="text-sm font-semibold tracking-wide text-[#4f6b62]">
            100 Days Home
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#2f4540]">
            오늘도 조금씩
            <br />
            우리 집이 되어가는 중
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#55706a]">
            입양 후 100일 동안의 적응 과정을 기록하고, 작은 회복의
            순간들을 함께 쌓아가요.
          </p>
          <div className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#55706a] shadow-sm">
            {dogProfile
              ? `${dogProfile.name}와 함께하는 적응 여정`
              : '첫 프로필을 등록해보세요'}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-stone-500">반려견</p>
          <p className="mt-2 text-2xl font-bold">
            {dogProfile ? dogProfile.name : '미등록'}
          </p>
        </div>

        <div className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-stone-500">회복 레벨</p>
          <p className="mt-2 text-2xl font-bold">Lv.{currentLevel.level}</p>
          <p className="text-sm font-semibold text-[#5f7a72]">
            {currentLevel.name}
          </p>
          <p className="mt-2 text-xs text-stone-500">점수: {totalScore}</p>
        </div>

        <div className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-stone-500">획득 업적</p>
          <p className="mt-2 text-2xl font-bold">
            {unlockedAchievements.length}개
          </p>
        </div>
      </section>

      <section className="rounded-card bg-white p-5 shadow-card">
        <p className="text-sm font-medium text-[#5f7a72]">현재 적응 단계</p>
        <h3 className="mt-2 text-2xl font-bold">
          Lv.{currentLevel.level} {currentLevel.name}
        </h3>
        <p className="mt-3 text-stone-600">{currentLevel.description}</p>
      </section>

      <section className="rounded-card bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#5f7a72]">
              100일 적응 여정
            </p>
            <h3 className="mt-2 text-2xl font-bold">Day {adoptionDay}</h3>
          </div>
          <p className="text-sm text-stone-500">{Math.round(progress)}%</p>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#dbe7e2]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7fa89b] to-[#aac7be] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm font-semibold text-[#5f7a72]">
          {adoptionDay < 100
            ? '천천히 우리 집이 되어가는 중이에요.'
            : '100일 여정을 완주했어요!'}
        </p>
      </section>

      <section className="rounded-card bg-white p-5 shadow-card">
        <p className="text-sm font-medium text-[#5f7a72]">오늘의 적응 코치</p>
        <p className="mt-3 text-stone-700">{coachMessage}</p>
      </section>

      <section className="rounded-card bg-white p-5 shadow-card">
        <p className="text-sm font-medium text-[#5f7a72]">최근 업적</p>
        {unlockedAchievements.length === 0 ? (
          <p className="mt-3 text-stone-600">
            아직 달성한 업적이 없어요. 첫 체크인을 남겨보세요.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {unlockedAchievements
              .slice(-3)
              .reverse()
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="rounded-xl bg-[#edf5f3] p-4"
                >
                  <p className="font-semibold">🏆 {achievement.title}</p>
                  <p className="mt-1 text-sm font-semibold text-[#5f7a72]">
                    {achievement.description}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="rounded-card bg-white p-5 shadow-card">
        <p className="text-sm font-medium text-[#5f7a72]">최근 체크인</p>
        {checkIns.length === 0 ? (
          <p className="mt-3 text-stone-600">아직 체크인 기록이 없어요.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {checkIns.slice(0, 3).map((checkIn) => (
              <div key={checkIn.id} className="rounded-xl bg-stone-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {new Date(checkIn.date).toLocaleDateString()}
                  </p>
                  <span className="text-sm text-stone-500">
                    {checkIn.score >= 0 ? '+' : ''}
                    {checkIn.score}
                  </span>
                </div>
                {checkIn.memo && (
                  <p className="mt-2 text-sm font-semibold text-[#5f7a72]">
                    {checkIn.memo}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
