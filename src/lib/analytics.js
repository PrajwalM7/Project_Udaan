import { getEvents, readJSON, keys } from './storage'

export const defaultScenario = {
  target: 500,
  channels: [
    { id: 'communities', name: 'Student communities', target: 250, visits: 1200, matcherCompletions: 480, ctaClicks: 320 },
    { id: 'clubs', name: 'Campus clubs & peer networks', target: 150, visits: 800, matcherCompletions: 320, ctaClicks: 210 },
    { id: 'referrals', name: 'Peer referrals', target: 100, visits: 500, matcherCompletions: 250, ctaClicks: 160 }
  ],
  dailyTargets: [30, 50, 65, 80, 90, 100, 85],
  messageTests: [
    { name: 'Project-first message', impressions: 1000, clicks: 120, registrations: 30 },
    { name: 'Placement-first message', impressions: 1000, clicks: 100, registrations: 28 }
  ]
}
export function getScenario() {
  const scenario = readJSON(keys.scenario, defaultScenario)
  return scenario && Array.isArray(scenario.channels) ? scenario : defaultScenario
}
export function saveScenario(scenario) {
  localStorage.setItem(keys.scenario, JSON.stringify(scenario))
}
export function getDashboardData() {
  const scenario = getScenario()
  const events = getEvents()
  const simulated = scenario.channels.reduce((sum, c) => sum + Number(c.target || 0), 0)
  const actualRegistrations = new Set(events.filter(e => e.type === 'demo_registration_completed').map(e => e.registrationId).filter(Boolean)).size
  const visits = scenario.channels.reduce((sum, c) => sum + Number(c.visits || 0), 0)
  const matcherCompletions = scenario.channels.reduce((sum, c) => sum + Number(c.matcherCompletions || 0), 0)
  const ctaClicks = scenario.channels.reduce((sum, c) => sum + Number(c.ctaClicks || 0), 0)
  return {
    scenario,
    events,
    visits,
    matcherCompletions,
    ctaClicks,
    simulatedRegistrations: simulated,
    actualRegistrations,
    target: Number(scenario.target || 500),
    attainment: Math.min(100, (simulated / Math.max(1, Number(scenario.target || 500))) * 100),
    remaining: Math.max(0, Number(scenario.target || 500) - simulated),
    matcherRate: visits ? matcherCompletions / visits * 100 : 0,
    ctaRate: matcherCompletions ? ctaClicks / matcherCompletions * 100 : 0
  }
}
export function moneySafeCostPerRegistration(spend, registrations, isRealData) {
  if (!isRealData || registrations <= 0) return null
  return spend / registrations
}
