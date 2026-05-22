import type { Achievement } from '../types'

export const achievements: Achievement[] = [
  {
    id: 'first-tail-wagging',
    title: '첫 꼬리 흔들기',
    description: '처음으로 편안하게 꼬리를 흔든 날이에요.',
    conditionTag: 'tail_wagging',
  },
  {
    id: 'first-name-response',
    title: '첫 이름 반응',
    description: '이름을 불렀을 때 반응을 보여줬어요.',
    conditionTag: 'name_response',
  },
  {
    id: 'first-walk-success',
    title: '첫 산책 성공',
    description: '새로운 바깥 환경에 한 걸음 적응했어요.',
    conditionTag: 'walk_success',
  },
  {
    id: 'first-touch',
    title: '첫 손길 허용',
    description: '처음으로 보호자의 손길을 허용했어요.',
    conditionTag: 'touch_allowed',
  },
  {
    id: 'first-comfortable-sleep',
    title: '첫 편안한 수면',
    description: '안정된 공간에서 편안하게 잠든 날이에요.',
    conditionTag: 'comfortable_sleep',
  },
  {
    id: 'first-trust-signal',
    title: '첫 신뢰 신호',
    description: '보호자를 따라다니며 신뢰를 보여줬어요.',
    conditionTag: 'following_owner',
  },
]
