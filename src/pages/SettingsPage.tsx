import { useDogStore } from '../store/useDogStore'

export default function SettingsPage() {
  const resetData = useDogStore((state) => state.resetData)

  const handleReset = async () => {
    const confirmed = window.confirm('정말 모든 데이터를 삭제할까요?')

    if (!confirmed) {
      return
    }

    try {
      await resetData()
      alert('데이터가 초기화됐어요.')
    } catch (error) {
      console.error('데이터 초기화 오류:', error)
      alert('데이터 초기화 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section>
        <p className="text-sm font-medium text-[#5f7a72]">Settings</p>
        <h2 className="mt-2 text-3xl font-bold text-[#2f4540]">설정</h2>
      </section>

      <section className="rounded-card bg-white p-5 shadow-card">
        <h3 className="font-semibold text-[#2f4540]">데이터 관리</h3>
        <button
          onClick={handleReset}
          className="mt-5 w-full rounded-2xl border border-red-200 bg-red-50 py-4 font-semibold text-red-600 transition hover:bg-red-100"
        >
          데이터 초기화
        </button>
      </section>
    </div>
  )
}
