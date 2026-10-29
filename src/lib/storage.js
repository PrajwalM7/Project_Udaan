const PREFIX = 'udaan.v1.'
export const keys = {
  profile: PREFIX + 'profile',
  events: PREFIX + 'events',
  scenario: PREFIX + 'scenario',
  consent: PREFIX + 'demo-notice',
  planner: PREFIX + 'planner',
  plannerTimeline: PREFIX + 'plannerTimeline'
}
export function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function createId(prefix = 'evt') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`
}
export function getOrCreateProfile() {
  let profile = readJSON(keys.profile, null)
  if (!profile?.id || !profile?.referralCode) {
    profile = { id: createId('visitor'), referralCode: `UDAAN-${Math.random().toString(36).slice(2, 7).toUpperCase()}` }
    writeJSON(keys.profile, profile)
  }
  return profile
}
export function getEvents() {
  return readJSON(keys.events, [])
}
export function trackEvent(type, details = {}) {
  const events = getEvents()
  const event = {
    id: createId(),
    type,
    at: new Date().toISOString(),
    visitorId: getOrCreateProfile().id,
    ...details
  }
  events.push(event)
  writeJSON(keys.events, events)
  return event
}
export function getPlanner() {return readJSON(keys.planner, getDefaultPlanner())}
export function savePlanner(data) {writeJSON(keys.planner, data)}
export function getPlannerTimeline() {return readJSON(keys.plannerTimeline, getDefaultTimeline())}
export function savePlannerTimeline(tl) {writeJSON(keys.plannerTimeline, tl)}
export function resetPlannerData() {
  localStorage.removeItem(keys.planner)
  localStorage.removeItem(keys.plannerTimeline)
}

// Reset all demo data (profile, events, scenario, consent, planner, timeline)
export function resetDemoData() {
  Object.values(keys).forEach(k => {
    try { localStorage.removeItem(k) } catch (e) { /* ignore */ }
  })
}
function getDefaultPlanner() {
  return {
    goal: 500,
    durationDays: 7,
    budget: 2000,
    channels: [
      {id: 'clubs', name: 'College clubs and student ambassadors', audience: 200, conversion: 10, actual: 0},
      {id: 'whatsapp', name: 'WhatsApp student communities', audience: 150, conversion: 12, actual: 0},
      {id: 'linkedin', name: 'LinkedIn and student communities', audience: 100, conversion: 8, actual: 0},
      {id: 'email', name: 'Email outreach', audience: 80, conversion: 5, actual: 0}
    ],
    budgetAllocations: [
      {id: 'creative', name: 'Promotional creative materials', amount: 300},
      {id: 'ambassador', name: 'Student ambassador incentives', amount: 800},
      {id: 'targeted', name: 'Optional targeted promotion', amount: 600},
      {id: 'contingency', name: 'Contingency', amount: 300}
    ]
  }
}
function getDefaultTimeline() {
  const days = []
  for (let i = 1; i <= 7; i++) {
    days.push({day: i, activity: '', channel: '', completed: false})
  }
  return days
}
