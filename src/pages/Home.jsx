import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Users, ChartNoAxesCombined, Check, Play, Target, Zap, Compass } from 'lucide-react'
import { Card, DemoNotice } from '../components/UI'

export default function Home() {
  return <div className="home-page">
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> STUDENT-FIRST GROWTH ENGINE</div>
        <h1>Your first AI project starts <span>here.</span></h1>
        <p className="hero-description">A better way to turn workshop curiosity into action. Discover a project that fits your goals, share it with friends, and see how a student-first campaign could grow.</p>
        <div className="hero-actions"><Link className="button button-primary button-large" to="/matcher">Find my AI project <ArrowRight size={18}/></Link><Link className="button button-secondary button-large" to="/growth"><Play size={16}/> Explore the dashboard</Link></div>
        <div className="hero-proof"><div className="proof-avatars"><span>U</span><span>AI</span><span>+</span></div><span>Designed for final-year engineering students</span></div>
      </div>
      <div className="hero-visual">
        <div className="visual-glow"/>
        <div className="passport-preview">
          <div className="passport-top"><span className="tiny-label">YOUR PROJECT PASSPORT</span><span className="passport-icon"><Sparkles size={17}/></span></div>
          <div className="project-number">PROJECT 001 <span>· PERSONALIZED</span></div>
          <h3>Smart Study Planner</h3>
          <p>A focused way to turn a busy syllabus into a realistic daily plan.</p>
          <div className="tag-row"><span>Beginner-friendly</span><span>60-minute build</span></div>
          <div className="passport-progress"><div><span>Build roadmap</span><strong>5 steps</strong></div><div className="progress-track"><span style={{ width: '78%' }}/></div></div>
          <div className="passport-bottom"><div className="mini-avatar">U</div><div><strong>Your next build</strong><small>Made for your learning goal</small></div><ArrowRight size={17}/></div>
        </div>
        <div className="floating-stat"><span className="float-icon"><Target size={17}/></span><div><strong>500</strong><small>Registration target</small></div><span className="float-arrow">↗</span></div>
        <div className="floating-note"><span className="green-check"><Check size={14}/></span> Built around student value</div>
      </div>
    </div>
    <DemoNotice>Project Udaan is a prototype. Campaign targets and dashboard scenarios are assumptions, not real registrations.</DemoNotice>
    <div className="section-block">
      <div className="section-heading"><div><div className="eyebrow">ONE CONNECTED JOURNEY</div><h2>From curiosity to community.</h2></div><p>Three connected tools that make the workshop easier to discover, share, and measure.</p></div>
      <div className="feature-grid">
        <Card className="feature-card"><div className="feature-icon icon-lilac"><Sparkles size={21}/></div><span className="feature-index">01 / DISCOVER</span><h3>AI Project Matcher</h3><p>Find a project idea based on your current skills, interests, and goals.</p><Link to="/matcher" className="text-link">Find your project <ArrowRight size={15}/></Link></Card>
        <Card className="feature-card"><div className="feature-icon icon-mint"><Users size={21}/></div><span className="feature-index">02 / SHARE</span><h3>Referral Center</h3><p>Turn your project discovery into an invitation for a friend to learn with you.</p><Link to="/referral" className="text-link">Explore referrals <ArrowRight size={15}/></Link></Card>
        <Card className="feature-card"><div className="feature-icon icon-blue"><ChartNoAxesCombined size={21}/></div><span className="feature-index">03 / LEARN</span><h3>Growth Dashboard</h3><p>Model the channels, funnel, and experiments behind a 500-registration target.</p><Link to="/growth" className="text-link">View dashboard <ArrowRight size={15}/></Link></Card>
      </div>
    </div>
    <div className="bottom-cta"><div><div className="eyebrow">START WITH VALUE</div><h2>Find the project you could build next.</h2><p>Three quick choices. One practical project blueprint. No API key required.</p></div><Link to="/matcher" className="button button-primary">Get my project <ArrowRight size={17}/></Link></div>
  </div>
}
