import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import AchievementPage from './pages/AchievementPage'
import CheckInPage from './pages/CheckInPage'
import HomePage from './pages/HomePage'
import MyDogPage from './pages/MyDogPage'
import SettingsPage from './pages/SettingsPage'
import TimelinePage from './pages/TimelinePage'
import { useDogStore } from './store/useDogStore'

function App() {
  const loadFromFirebase = useDogStore((state) => state.loadFromFirebase)

  useEffect(() => {
    void loadFromFirebase().catch((error) => {
      console.error('Firebase 데이터 불러오기 오류:', error)
    })
  }, [loadFromFirebase])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check-in" element={<CheckInPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/achievements" element={<AchievementPage />} />
          <Route path="/my-dog" element={<MyDogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
