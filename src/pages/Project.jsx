import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, Check, Clock3, Copy, Share2, Sparkles, Target } from 'lucide-react'
import { PageHeader, Card, Button, DemoNotice } from '../components/UI'
import { readJSON, trackEvent } from '../lib/storage'

export default function Project() {
  const project = readJSON('udaan.v1.project', null)
  async function copySummary() {
    if (!project) return
    const text = `${project.title}\n${project.problem}\nFeatures: ${project.features.join(', ')}\nBuilt with: ${project.tools.join(', ')}`
    try { await navigator.clipboard.writeText(text); trackEvent('project_summary_copied'); alert('Project summary copied.') } catch { alert(text) }
  }
  async function share() {
    const url = `${window.location.origin}/?source=project-share`
    const text = `I found a project idea: ${project?.title || 'my first AI project'}. Explore your own project idea with Project Udaan. ${url}`
    try { if (navigator.share) await navigator.share({ title: 'My Project Passport', text, url }); else { await navigator.clipboard.writeText(text); alert('Invitation copied.') } trackEvent('project_invitation_shared') } catch {}
  }
  if (!project) return <div className="narrow-page"><PageHeader eyebrow="PROJECT PASSPORT" title="Let's find your project first." description="Answer three quick questions to create your personalized project passport."/><Card className="empty-state"><Sparkles size={30}/><h2>No project passport yet</h2><p>Complete the matcher and your recommendation will appear here.</p><Link className="button button-primary" to="/matcher">Start the matcher <ArrowRight size={16}/></Link></Card></div>
  return <div>
    <PageHeader eyebrow="YOUR PROJECT PASSPORT" title="A project that fits you." description="Your personalized build brief is ready. Use it as a starting point, then make it your own." action={<Button variant="secondary" onClick={copySummary}><Copy size={16}/> Copy summary</Button>}/>
    <DemoNotice>This is a rule-based project recommendation using curated templates, not output from a live AI model.</DemoNotice>
    <div className="project-layout">
      <div className="project-main">
        <Card className="project-hero-card"><div className="passport-top"><span className="tiny-label">PROJECT PASSPORT · UDAAN</span><span className="soft-badge"><Sparkles size={13}/> Personalized</span></div><div className="project-hero-icon"><Sparkles size={25}/></div><div className="eyebrow">{project.interest.toUpperCase()} / {project.level.toUpperCase()}</div><h2>{project.title}</h2><p>{project.problem}</p><div className="tag-row">{project.tools.map(t => <span key={t}>{t}</span>)}</div><div className="project-actions"><Button onClick={share}><Share2 size={16}/> Share my passport</Button><Link className="button button-secondary" to="/referral">Invite a friend <ArrowUpRight size={16}/></Link></div></Card>
        <Card><div className="card-heading"><span className="card-heading-icon"><Target size={18}/></span><div><h3>What you will build</h3><p>Keep the first version focused on these core features.</p></div></div><div className="feature-checklist">{project.features.map((f, i) => <div key={f}><span><Check size={15}/></span><div><strong>{f}</strong><small>Core feature {i + 1}</small></div></div>)}</div></Card>
        <Card><div className="card-heading"><span className="card-heading-icon"><Clock3 size={18}/></span><div><h3>Your 60-minute roadmap</h3><p>A practical sequence for a small proof of concept.</p></div></div><div className="roadmap">{project.roadmap.map(([time, task], i) => <div className="roadmap-row" key={time}><div className="roadmap-marker">{i + 1}</div><div className="roadmap-time">{time}</div><div className="roadmap-task">{task}</div></div>)}</div></Card>
      </div>
      <aside className="project-aside"><Card><div className="aside-label">YOUR GOAL</div><h3>{project.goal}</h3><p>{project.goalTip}</p><div className="aside-divider"/><div className="aside-label">RECOMMENDED TOOLS</div>{project.tools.map(t => <div className="tool-line" key={t}><Check size={14}/>{t}</div>)}</Card><Card className="workshop-card"><span className="workshop-icon"><BookOpen size={20}/></span><div className="eyebrow">NEXT STEP</div><h3>Build your first AI project in 60 minutes.</h3><p>Explore the free workshop concept and see how this campaign is designed to reach students.</p><Button onClick={() => { trackEvent('registration_cta_clicked', { source: 'project_passport' }); alert('Demo only: connect this CTA to the official workshop registration URL when one is provided.') }}>Explore workshop <ArrowRight size={16}/></Button><small>Demo CTA — no registration is submitted.</small></Card></aside>
    </div>
  </div>
}
