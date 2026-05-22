import { signInAnonymously } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { create } from 'zustand'

import { achievements as defaultAchievements } from '../constants/achievements'
import { db, getFirebaseAuth } from '../firebase'
import type { Achievement, CheckIn, DogProfile } from '../types'

type PersistedDogData = {
  dogProfile?: DogProfile
  checkIns: CheckIn[]
  achievements: Achievement[]
  unlockedAchievements: Achievement[]
}

type DogStore = PersistedDogData & {
  addCheckIn: (newCheckIn: CheckIn) => Promise<void>
  loadFromFirebase: () => Promise<void>
  resetData: () => Promise<void>
  setDogProfile: (profile: DogProfile) => Promise<void>
}

const initialAchievements = defaultAchievements.map((achievement) => ({
  ...achievement,
}))

const getInitialData = (): PersistedDogData => ({
  dogProfile: undefined,
  checkIns: [],
  achievements: initialAchievements,
  unlockedAchievements: [],
})

const mergeAchievements = (savedAchievements?: Achievement[]) => {
  return initialAchievements.map((achievement) => {
    const savedAchievement = savedAchievements?.find(
      (item) => item.id === achievement.id,
    )

    return savedAchievement
      ? {
          ...achievement,
          unlockedAt: savedAchievement.unlockedAt,
        }
      : achievement
  })
}

const normalizeData = (data?: Partial<PersistedDogData>): PersistedDogData => {
  const achievements = mergeAchievements(data?.achievements)

  return {
    dogProfile: data?.dogProfile,
    checkIns: data?.checkIns ?? [],
    achievements,
    unlockedAchievements: achievements.filter(
      (achievement) => achievement.unlockedAt,
    ),
  }
}

const withTimeout = async <T>(promise: Promise<T>, message: string) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(message))
    }, 12000)
  })

  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}

let signInPromise: Promise<string> | undefined

const getUserId = async () => {
  const auth = getFirebaseAuth()

  if (auth.currentUser) {
    return auth.currentUser.uid
  }

  signInPromise ??= withTimeout(
    signInAnonymously(auth).then((credential) => credential.user.uid),
    'Firebase 익명 로그인 시간이 초과되었습니다. Anonymous Auth 설정을 확인해주세요.',
  ).catch((error) => {
    signInPromise = undefined
    throw error
  })

  return signInPromise
}

const getUserDocRef = async () => {
  const userId = await getUserId()
  return doc(db, 'users', userId)
}

const readPersistedData = (rawData: Record<string, unknown>) => {
  if (typeof rawData.dataJson === 'string') {
    return JSON.parse(rawData.dataJson) as Partial<PersistedDogData>
  }

  return rawData as Partial<PersistedDogData>
}

const saveUserData = async (data: PersistedDogData) => {
  const docRef = await getUserDocRef()

  await withTimeout(
    setDoc(docRef, data, { merge: true }),
    'Firestore 저장 시간이 초과되었습니다. Firestore Rules와 네트워크 상태를 확인해주세요.',
  )
}

export const useDogStore = create<DogStore>((set, get) => ({
  ...getInitialData(),

  loadFromFirebase: async () => {
    const docRef = await getUserDocRef()
    const snap = await withTimeout(
      getDoc(docRef),
      'Firestore 불러오기 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.',
    )

    if (!snap.exists()) {
      set(getInitialData())
      return
    }

    set(normalizeData(readPersistedData(snap.data())))
  },

  setDogProfile: async (profile) => {
    const data = {
      dogProfile: profile,
      checkIns: get().checkIns,
      achievements: get().achievements,
      unlockedAchievements: get().unlockedAchievements,
    }

    set(data)
    await saveUserData(data)
  },

  addCheckIn: async (newCheckIn) => {
    const updatedCheckIns = [newCheckIn, ...get().checkIns]
    const data = {
      dogProfile: get().dogProfile,
      checkIns: updatedCheckIns,
      achievements: get().achievements,
      unlockedAchievements: get().unlockedAchievements,
    }

    set(data)
    await saveUserData(data)
  },

  resetData: async () => {
    const data = getInitialData()

    set(data)
    await saveUserData(data)
  },
}))
