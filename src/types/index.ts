export type Emotion =
  | 'stable'
  | 'tense'
  | 'anxious'
  | 'active'
  | 'tired'

export type BehaviorTag =
  | 'eating_well'
  | 'walk_success'
  | 'tail_wagging'
  | 'name_response'
  | 'touch_allowed'
  | 'following_owner'
  | 'hiding'
  | 'stranger_alert'
  | 'less_barking'
  | 'comfortable_sleep'

export type DogProfile = {
  id: string
  name: string
  adoptionDate: string
  birthDate?: string
  breed?: string
  personalityTags: string[]
  imageUrl?: string
}

export type CheckIn = {
  id: string
  date: string
  emotion: Emotion
  behaviorTags: BehaviorTag[]
  memo?: string
  score: number
  imageUrl?: string
}

export type Achievement = {
  id: string
  title: string
  description: string
  conditionTag: BehaviorTag
  unlockedAt?: string
}