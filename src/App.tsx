import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import ChooseTheme from './pages/ChooseTheme'
import ActivityPlan from './pages/ActivityPlan'
import PromptBank from './pages/PromptBank'
import Reflection from './pages/Reflection'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/themes" element={<ChooseTheme />} />
        <Route path="/plan" element={<ActivityPlan />} />
        <Route path="/prompts" element={<PromptBank />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
