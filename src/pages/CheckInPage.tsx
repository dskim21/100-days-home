import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { behaviorTags } from '../constants/behaviorTags'
import { emotions } from '../constants/emotions'
import { ui } from '../styles/ui'
import { useDogStore } from '../store/useDogStore'
import type { BehaviorTag, CheckIn, Emotion } from '../types'

type CloudinaryUploadResponse = {
  secure_url: string
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

const validateImageFile = (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (
    !ALLOWED_IMAGE_TYPES.includes(file.type) ||
    !extension ||
    !ALLOWED_EXTENSIONS.includes(extension)
  ) {
    return 'jpg, png, webp 형식의 이미지만 업로드할 수 있어요.'
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return '이미지는 5MB 이하만 업로드할 수 있어요.'
  }

  return undefined
}

const uploadImageToCloudinary = async (file: File) => {
  const validationMessage = validateImageFile(file)

  if (validationMessage) {
    throw new Error(validationMessage)
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary 설정이 아직 없습니다.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', '100-days-home/check-ins')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Cloudinary 업로드 실패: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as CloudinaryUploadResponse
  return data.secure_url
}

export default function CheckInPage() {
  const navigate = useNavigate()
  const addCheckIn = useDogStore((state) => state.addCheckIn)

  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null)
  const [selectedTags, setSelectedTags] = useState<BehaviorTag[]>([])
  const [memo, setMemo] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleToggleTag = (tag: BehaviorTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    )
  }

  const clearImage = () => {
    setImageFile(null)
    setPreviewUrl(null)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      clearImage()
      return
    }

    const validationMessage = validateImageFile(file)

    if (validationMessage) {
      event.target.value = ''
      clearImage()
      alert(validationMessage)
      return
    }

    setImageFile(file)

    const reader = new FileReader()
    reader.onload = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const calculateScore = () => {
    return behaviorTags
      .filter((tag) => selectedTags.includes(tag.value))
      .reduce((total, tag) => total + tag.score, 0)
  }

  const handleSubmit = async () => {
    if (!selectedEmotion) {
      alert('오늘의 감정을 선택해주세요.')
      return
    }

    const newCheckIn: CheckIn = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      emotion: selectedEmotion,
      behaviorTags: selectedTags,
      memo,
      score: calculateScore(),
    }

    try {
      setIsSaving(true)

      if (imageFile) {
        try {
          newCheckIn.imageUrl = await uploadImageToCloudinary(imageFile)
        } catch (error) {
          console.error('사진 업로드 오류:', error)
          alert('사진 업로드는 실패했지만 체크인 기록은 저장합니다.')
        }
      }

      await addCheckIn(newCheckIn)
      alert('오늘 체크인이 저장됐어요.')
      navigate('/')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '체크인 저장 중 오류가 발생했습니다.'

      console.error('체크인 저장 오류:', error)
      alert(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={ui.pageContainer}>
      <section>
        <p className={ui.pageLabel}>Daily Check-In</p>
        <h2 className={`mt-2 ${ui.pageTitle}`}>오늘 상태 체크하기</h2>
        <p className="mt-3 text-stone-600">
          오늘 반려견의 감정과 행동 변화를 간단히 기록해요.
        </p>
      </section>

      <section className={ui.card}>
        <h3 className="font-semibold">오늘 감정 상태</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => setSelectedEmotion(emotion.value)}
              className={[
                'rounded-2xl border p-4 transition',
                selectedEmotion === emotion.value
                  ? 'border-brand-main bg-brand-soft'
                  : 'border-stone-200 bg-white',
              ].join(' ')}
            >
              <div className="text-2xl">{emotion.emoji}</div>
              <p className="mt-2 text-sm font-medium">{emotion.label}</p>
            </button>
          ))}
        </div>
      </section>

      <section className={ui.card}>
        <h3 className="font-semibold">오늘 행동</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {behaviorTags.map((tag) => {
            const selected = selectedTags.includes(tag.value)

            return (
              <button
                key={tag.value}
                onClick={() => handleToggleTag(tag.value)}
                className={[
                  'rounded-full px-4 py-2 text-sm transition',
                  selected
                    ? 'bg-brand-main text-white'
                    : 'bg-brand-soft text-stone-700',
                ].join(' ')}
              >
                {tag.label}{' '}
                {selected ? `(${tag.score >= 0 ? '+' : ''}${tag.score})` : ''}
              </button>
            )
          })}
        </div>
      </section>

      <section className={ui.card}>
        <h3 className="font-semibold">메모</h3>
        <textarea
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          placeholder="예: 오늘 처음으로 꼬리를 흔들었어요."
          rows={4}
          className={ui.input}
        />
      </section>

      <section className={ui.card}>
        <h3 className="font-semibold">사진 첨부</h3>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
        />
        <p className="mt-2 text-xs text-stone-500">
          jpg, png, webp 형식만 가능하며 최대 5MB까지 업로드할 수 있어요.
        </p>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="선택한 체크인 사진 미리보기"
            className="mt-3 max-h-40 w-full rounded-xl object-cover"
          />
        )}
      </section>

      <button
        onClick={handleSubmit}
        disabled={isSaving}
        className={`${ui.primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isSaving ? '저장 중...' : '체크인 저장하기'}
      </button>
    </div>
  )
}
