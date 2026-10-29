import { NavLink, Link } from 'react-router-dom'
import { Sparkles, LayoutDashboard, Users, Compass, BookOpen, Menu, X, Leaf, CalendarDays } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Overview', icon: Compass },
  { to: '/matcher', label: 'Project matcher', icon: Sparkles },
  { to: '/referral', label: 'Referral center', icon: Users },
  { to: '/growth', label: 'Growth dashboard', icon: LayoutDashboard },
  { to: '/campaign', label: 'Campaign plan', icon: BookOpen },
  { to: '/planner', label: 'Campaign Planner', icon: CalendarDays }
]
export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark"><Leaf size={20}/></span>
        <span><strong>udaan</strong><small>GROWTH ENGINE</small></span>
      </Link>
      <div className="nav-label">WORKSPACE</div>
      <nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18}/><span>{label}</span>{to === '/growth' && <span className="nav-dot"/>}</NavLink>)}</nav>
      <div className="sidebar-bottom">
        <div className="mini-card"><span className="status-dot"/> <strong>Simulation mode</strong><p>Planning data only. No real campaign has run.</p></div>
        <div className="sidebar-foot">Made for the NxtWave Growth Intern Challenge</div>
      </div>
    </aside>
    {open && <button className="mobile-scrim" onClick={() => setOpen(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={20}/> : <Menu size={20}/>}</button>
        <div className="breadcrumb">Workspace <span>/</span> <strong>Project Udaan</strong></div>
        <div className="topbar-right"><span className="simulation-pill"><span className="status-dot"/> Simulation mode</span><div className="avatar">U</div></div>
      </header>
      <div className="page-content">{children}</div>
      <footer className="footer"><span>Project Udaan</span><span>Built as a transparent growth simulation · ₹0 paid campaign spend</span></footer>
    </main>
  </div>
}
