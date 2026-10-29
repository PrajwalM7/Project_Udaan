import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Matcher from './pages/Matcher'
import Project from './pages/Project'
import Referral from './pages/Referral'
import Growth from './pages/Growth'
import Campaign from './pages/Campaign'
import Planner from './pages/Planner'

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/matcher" element={<Matcher/>}/>
    <Route path="/project" element={<Project/>}/>
    <Route path="/referral" element={<Referral/>}/>
    <Route path="/growth" element={<Growth/>}/>
    <Route path="/campaign" element={<Campaign/>}/>
    <Route path="/planner" element={<Planner/>}/>
    <Route path="*" element={<Home/>}/>
  </Routes></Layout>
}