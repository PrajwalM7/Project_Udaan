import { ArrowUpRight, Info } from 'lucide-react'
export function PageHeader({ eyebrow, title, description, action }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="header-action">{action}</div>}</div>
}
export function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>
}
export function SectionTitle({ title, subtitle, action }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}
export function DemoNotice({ children = 'Simulated planning data — not actual campaign results.' }) {
  return <div className="notice"><Info size={16}/><span>{children}</span></div>
}
export function Button({ children, variant = 'primary', ...props }) {
  return <button className={`button button-${variant}`} {...props}>{children}</button>
}
export function LinkButton({ to, children, variant = 'primary' }) {
  return <a className={`button button-${variant}`} href={to}>{children}<ArrowUpRight size={16}/></a>
}
export function Metric({ label, value, detail, icon: Icon, tone = 'green' }) {
  return <div className="metric-card"><div className={`metric-icon tone-${tone}`}>{Icon && <Icon size={19}/>}</div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div></div>
}
