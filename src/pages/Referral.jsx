import { useEffect, useMemo, useState } from 'react'
import { Copy, Link2, Share2, Users, MousePointerClick, UserCheck, RefreshCw, Check, ArrowRight } from 'lucide-react'
import { PageHeader, Card, Button, DemoNotice, Metric } from '../components/UI'
import { getOrCreateProfile, getEvents, trackEvent } from '../lib/storage'

export default function Referral() {
  const profile = useMemo(() => getOrCreateProfile(), [])
  const [events, setEvents] = useState(getEvents())
  const [copied, setCopied] = useState(false)
  const referralUrl = `${window.location.origin}/?ref=${profile.referralCode}`
  const visits = events.filter(e => e.type === 'referral_visit' && e.referralCode === profile.referralCode).length
  const registrations = new Set(events.filter(e => e.type === 'demo_registration_completed' && e.referralCode === profile.referralCode).map(e => e.registrationId).filter(Boolean)).size
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const incoming = params.get('ref')
    if (incoming && incoming !== profile.referralCode && !sessionStorage.getItem('udaan.ref.' + incoming)) {
      trackEvent('referral_visit', { referralCode: incoming, source: 'incoming_link' })
      sessionStorage.setItem('udaan.ref.' + incoming, '1')
    }
    setEvents(getEvents())
  }, [profile.referralCode])
  async function copy(text, type) {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); trackEvent(type); setEvents(getEvents()) } catch { window.prompt('Copy this text:', text) }
  }
  const message = `I found a project idea with Project Udaan. Explore your own project and the free “Build Your First AI Project in 60 Minutes” workshop: ${referralUrl}`
  return <div>
    <PageHeader eyebrow="PEER-TO-PEER GROWTH" title="Good projects travel." description="Invite a friend to discover a project idea and explore the workshop with you." action={<Button variant="secondary" onClick={() => { trackEvent('referral_link_copied'); setEvents(getEvents()) }}><RefreshCw size={15}/> Refresh stats</Button>}/>
    <DemoNotice>Referral analytics are stored in this browser only. Visits are not proof of real people or registrations.</DemoNotice>
    <div className="metric-grid metric-grid-three"><Metric label="Referral link visits" value={visits} detail="Local demo events" icon={MousePointerClick} tone="blue"/><Metric label="Attributed registrations" value={registrations} detail="Verified demo registration events only" icon={UserCheck} tone="green"/><Metric label="Your referral code" value={profile.referralCode} detail="Anonymous demo identity" icon={Users} tone="purple"/></div>
    <div className="referral-layout">
      <Card className="referral-main"><div className="referral-art"><div className="referral-art-orbit orbit-one"/><div className="referral-art-orbit orbit-two"/><div className="referral-art-center"><Users size={31}/></div><span className="orbit-person person-one">A</span><span className="orbit-person person-two">B</span><span className="orbit-person person-three">+</span></div><div className="eyebrow">YOUR INVITATION</div><h2>Build better, together.</h2><p>Share a project discovery experience—not just another event poster. Your friend can find a project that fits their goals, too.</p><label className="field-label" htmlFor="ref-link">Your personal demo link</label><div className="copy-field"><input id="ref-link" value={referralUrl} readOnly/><Button onClick={() => copy(referralUrl, 'referral_link_copied')}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Copied' : 'Copy link'}</Button></div><div className="share-actions"><Button onClick={() => copy(message, 'referral_message_copied')} variant="secondary"><Share2 size={16}/> Copy invite message</Button><Button onClick={() => { trackEvent('referral_share_clicked'); setEvents(getEvents()); if (navigator.share) navigator.share({ title: 'Project Udaan', text: message, url: referralUrl }).catch(() => {}) }} variant="secondary"><Link2 size={16}/> Share invitation</Button></div></Card>
      <Card className="referral-how"><div className="eyebrow">HOW IT WORKS</div><h3>A simple loop with a clear purpose.</h3><div className="how-row"><span>01</span><div><strong>Discover</strong><p>Find a personalized project idea.</p></div></div><div className="how-row"><span>02</span><div><strong>Invite</strong><p>Share your referral link with a friend.</p></div></div><div className="how-row"><span>03</span><div><strong>Measure</strong><p>Track local demo visits separately from completed registrations.</p></div></div><div className="referral-footnote"><ArrowRight size={15}/> No rewards or guaranteed outcomes are promised.</div></Card>
    </div>
  </div>
}
