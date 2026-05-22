import type { BehaviorTag } from '../types'

export const behaviorTags: {
  value: BehaviorTag
  label: string
  score: number
}[] = [
  { value: 'eating_well', label: '밥을 잘 먹음', score: 5 },
  { value: 'walk_success', label: '산책 성공', score: 8 },
  { value: 'tail_wagging', label: '꼬리 흔듦', score: 10 },
  { value: 'name_response', label: '이름 반응', score: 10 },
  { value: 'touch_allowed', label: '손길 허용', score: 12 },
  { value: 'following_owner', label: '보호자 따라다님', score: 8 },
  { value: 'hiding', label: '숨는 행동', score: -6 },
  { value: 'stranger_alert', label: '낯선 사람 경계', score: -5 },
  { value: 'less_barking', label: '짖음 감소', score: 6 },
  { value: 'comfortable_sleep', label: '편안한 수면', score: 10 },
]
