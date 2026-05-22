import { useEffect, useState } from 'react'

import { useDogStore } from '../store/useDogStore'
import { getAdoptionDay } from '../utils/getAdoptionDay'
import type { DogProfile } from '../types'

type DogProfileFormProps = {
  dogProfile?: DogProfile
  onSave: (profile: DogProfile) => Promise<void>
}

function DogProfileForm({ dogProfile, onSave }: DogProfileFormProps) {
  const [name, setName] = useState(dogProfile?.name ?? '')
  const [breed, setBreed] = useState(dogProfile?.breed ?? '')
  const [adoptionDate, setAdoptionDate] = useState(
    dogProfile?.adoptionDate ?? '',
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!name.trim() || !adoptionDate) {
      alert('이름과 입양일은 필수 입력입니다.')
      return
    }

    const profileData: DogProfile = {
      id: dogProfile?.id ?? crypto.randomUUID(),
      name: name.trim(),
      adoptionDate,
      breed: breed.trim(),
      personalityTags: dogProfile?.personalityTags ?? [],
    }

    try {
      setIsSaving(true)
      await onSave(profileData)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="space-y-4 rounded-card bg-white p-5 shadow-card">
      <div>
        <label
          className="block text-sm font-medium text-stone-700"
          htmlFor="dog-name"
        >
          이름
        </label>
        <input
          id="dog-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="강아지 이름"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-stone-700"
          htmlFor="dog-breed"
        >
          견종
        </label>
        <input
          id="dog-breed"
          type="text"
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="예: 믹스견"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-stone-700"
          htmlFor="adoption-date"
        >
          입양일
        </label>
        <input
          id="adoption-date"
          type="date"
          value={adoptionDate}
          onChange={(event) => setAdoptionDate(event.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full rounded-2xl bg-brand-main py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? '저장 중...' : '저장'}
      </button>
    </section>
  )
}

function DogProfilePreview({ dogProfile }: { dogProfile: DogProfile }) {
  const adoptionDay = getAdoptionDay(dogProfile.adoptionDate)

  return (
    <section className="rounded-card bg-white p-5 shadow-card">
      <p className="text-sm font-medium text-[#5f7a72]">저장된 프로필</p>
      <div className="mt-4 flex items-center gap-4 text-left">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-3xl">
          🐶
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-bold text-[#2f4540]">
            {dogProfile.name}
          </h3>
          <div className="mt-2 space-y-1 text-sm text-stone-600">
            {dogProfile.breed && <p>견종: {dogProfile.breed}</p>}
            <p>입양일: {dogProfile.adoptionDate}</p>
            <p>함께한 지 Day {adoptionDay}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function MyDogPage() {
  const dogProfile = useDogStore((state) => state.dogProfile)
  const setDogProfile = useDogStore((state) => state.setDogProfile)
  const loadFromFirebase = useDogStore((state) => state.loadFromFirebase)

  useEffect(() => {
    void loadFromFirebase().catch((error) => {
      console.error('Firebase 데이터 불러오기 오류:', error)
    })
  }, [loadFromFirebase])

  const handleSave = async (profile: DogProfile) => {
    try {
      await setDogProfile(profile)
      alert('강아지 정보가 저장되었습니다.')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '프로필 저장 중 오류가 발생했습니다.'

      console.error('프로필 저장 오류:', error)
      alert(message)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <section>
        <p className="text-sm font-medium text-stone-500">My Dog</p>
        <h2 className="mt-2 text-3xl font-bold text-stone-900">
          강아지 정보
        </h2>
      </section>

      <DogProfileForm
        key={dogProfile?.id ?? 'new-profile'}
        dogProfile={dogProfile}
        onSave={handleSave}
      />

      {dogProfile && <DogProfilePreview dogProfile={dogProfile} />}
    </div>
  )
}
