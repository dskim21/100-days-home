import type { CheckIn } from '../types'

export function generateCoachMessage(checkIns: CheckIn[]) {
  if (checkIns.length === 0) {
    return '첫 체크인을 남기면 오늘의 적응 코치를 보여드릴게요.'
  }

  const latest = checkIns[0]
  const tags = latest.behaviorTags

  if (latest.emotion === 'anxious' || tags.includes('hiding')) {
    return '아직 환경이 낯설 수 있어요. 다가가기보다 안전한 공간과 조용한 시간을 지켜주세요.'
  }

  if (tags.includes('eating_well') && tags.includes('comfortable_sleep')) {
    return '생활 리듬이 안정되고 있어요. 지금처럼 일정한 루틴을 유지해주세요.'
  }

  if (tags.includes('name_response') || tags.includes('following_owner')) {
    return '보호자와의 신뢰가 생기고 있어요. 짧은 칭찬과 간식 보상으로 좋은 경험을 쌓아주세요.'
  }

  if (tags.includes('walk_success')) {
    return '바깥 환경에 대한 적응이 조금씩 진행되고 있어요. 무리하지 말고 짧은 성공 경험을 반복해주세요.'
  }

  return '오늘의 작은 변화가 쌓이고 있어요. 급하게 판단하지 말고 천천히 지켜봐 주세요.'
}
