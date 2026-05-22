import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { behaviorTags } from '../constants/behaviorTags'
import { emotions } from '../constants/emotions'
import { ui } from '../styles/ui'
import { useDogStore } from '../store/useDogStore'
import { getAdoptionDay } from '../utils/getAdoptionDay'
import type { BehaviorTag, Emotion } from '../types'

export default function TimelinePage() {
  const checkIns = useDogStore((state) => state.checkIns)
  const dogProfile = useDogStore((state) => state.dogProfile)

  const getBehaviorLabel = (value: BehaviorTag) => {
    return behaviorTags.find((tag) => tag.value === value)?.label ?? value
  }

  const getEmotionInfo = (value: Emotion) => {
    return emotions.find((emotion) => emotion.value === value)
  }

  const chartData = [...checkIns].reverse().map((checkIn) => ({
    day: getAdoptionDay(dogProfile?.adoptionDate, checkIn.date),
    score: checkIn.score,
  }))

  return (
    <div className={ui.pageContainer}>
      <section>
        <p className={ui.pageLabel}>Timeline</p>
        <h2 className={`mt-2 ${ui.pageTitle}`}>적응 타임라인</h2>
        <p className="mt-3 text-stone-600">
          매일의 감정, 행동, 메모, 사진을 시간순으로 확인해요.
        </p>
      </section>

      {checkIns.length > 0 && (
        <section className="rounded-card bg-white p-4 shadow-card">
          <h3 className="mb-2 font-semibold">점수 추이</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#7fa89b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {checkIns.length === 0 ? (
        <div className={`text-center ${ui.card}`}>
          <p className="text-lg font-semibold">아직 체크인 기록이 없어요.</p>
          <p className="mt-2 text-stone-500">
            첫 체크인을 남기면 이곳에 기록이 쌓여요.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {checkIns.map((checkIn) => {
            const emotion = getEmotionInfo(checkIn.emotion)

            return (
              <article
                key={checkIn.id}
                className={`${ui.card} min-h-[140px] transition hover:scale-[1.01] md:min-h-[160px]`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Day {getAdoptionDay(dogProfile?.adoptionDate, checkIn.date)}
                  </h3>
                  <span className="text-sm text-stone-500">
                    {new Date(checkIn.date).toLocaleDateString()}
                  </span>
                </div>

                {emotion && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm text-brand-primary">
                      {emotion.emoji} {emotion.label}
                    </span>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {checkIn.behaviorTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-soft px-3 py-1 text-sm text-brand-primary"
                    >
                      {getBehaviorLabel(tag)}
                    </span>
                  ))}
                </div>

                {checkIn.memo && (
                  <p className="mt-3 break-words text-stone-600">
                    {checkIn.memo}
                  </p>
                )}

                {checkIn.imageUrl && (
                  <img
                    src={checkIn.imageUrl}
                    alt="체크인 사진"
                    className="mt-3 max-h-64 w-full rounded-xl object-cover"
                  />
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
