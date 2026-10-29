import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Code2, GraduationCap, Lightbulb, Sparkles, Sprout, BriefcaseBusiness, Trophy } from 'lucide-react'
import { PageHeader, Card, Button } from '../components/UI'
import { getProject } from '../data/projects'
import { trackEvent, writeJSON } from '../lib/storage'

const steps = [
  { key: 'level', title: 'Where are you with coding?', subtitle: 'We will match the project to your comfort level.', options: [{ value: 'beginner', label: 'Just starting', desc: 'I know the basics and want a simple win', icon: Sprout }, { value: 'intermediate', label: 'I know the basics', desc: 'I can build small features on my own', icon: Code2 }, { value: 'advanced', label: 'Ready for a challenge', desc: 'I want to connect several pieces together', icon: Trophy }] },
  { key: 'interest', title: 'What would you love to build?', subtitle: 'Choose the area that feels most interesting.', options: [{ value: 'Web development', label: 'Web development', desc: 'Useful tools and interactive websites', icon: Code2 }, { value: 'Productivity', label: 'Productivity', desc: 'Make everyday work simpler', icon: Lightbulb }, { value: 'Education', label: 'Education', desc: 'Help people learn more effectively', icon: GraduationCap }, { value: 'Agriculture', label: 'Agriculture', desc: 'Solve practical farming and garden problems', icon: Sprout }] },
  { key: 'goal', title: 'What is your main goal?', subtitle: 'We will shape the project advice around it.', options: [{ value: 'Placement portfolio', label: 'Placement portfolio', desc: 'Build something you can explain in an interview', icon: BriefcaseBusiness }, { value: 'Learn AI', label: 'Learn AI', desc: 'Understand the building blocks through practice', icon: Sparkles }, { value: 'Hackathon', label: 'Hackathon', desc: 'Create a small but clear proof of concept', icon: Trophy }] }
]
export default function Matcher() {
  const [answers, setAnswers] = useState({ level: '', interest: '', goal: '' })
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const current = steps[step]
  function choose(value) { setAnswers(prev => ({ ...prev, [current.key]: value })) }
  function finish() {
    const project = getProject(answers.level, answers.interest, answers.goal)
    writeJSON('udaan.v1.project', project)
    trackEvent('project_matcher_completed', { level: answers.level, interest: answers.interest, goal: answers.goal })
    navigate('/project')
  }
  return <div className="narrow-page">
    <PageHeader eyebrow="PROJECT MATCHER" title="Find your next build." description="Three quick choices help us recommend a practical project that fits your current skills and goals."/>
    <div className="stepper"><div className="stepper-line"><span style={{ width: `${(step + 1) / steps.length * 100}%` }}/></div><div className="stepper-labels">{steps.map((s, i) => <div key={s.key} className={i <= step ? 'step-active' : ''}><span>{i < step ? <Check size={13}/> : i + 1}</span><small>{['Your level', 'Your interest', 'Your goal'][i]}</small></div>)}</div></div>
    <Card className="matcher-card">
      <div className="matcher-card-head"><span className="step-kicker">STEP {step + 1} OF 3</span><span className="soft-badge">~ 30 seconds</span></div>
      <h2>{current.title}</h2><p className="muted">{current.subtitle}</p>
      <div className={`option-grid ${step === 1 ? 'option-grid-two' : ''}`}>
        {current.options.map(({ value, label, desc, icon: Icon }) => <button key={value} className={`option-card ${answers[current.key] === value ? 'option-selected' : ''}`} onClick={() => choose(value)}><span className="option-icon"><Icon size={20}/></span><span className="option-copy"><strong>{label}</strong><small>{desc}</small></span><span className="option-radio">{answers[current.key] === value && <span/>}</span></button>)}
      </div>
      <div className="matcher-footer"><Button variant="secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}><ArrowLeft size={16}/> Back</Button>{step < 2 ? <Button disabled={!answers[current.key]} onClick={() => setStep(s => s + 1)}>Continue <ArrowRight size={16}/></Button> : <Button disabled={!answers[current.key]} onClick={finish}><Sparkles size={16}/> Create my passport</Button>}</div>
    </Card>
    <p className="privacy-note"><span className="privacy-dot"/> No account required. Your demo choices stay in this browser.</p>
  </div>
}
