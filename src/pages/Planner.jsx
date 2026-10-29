
import { useState, useEffect } from 'react'
import {
  PageHeader,
  Card,
  Button,
  DemoNotice,
  Metric,
} from '../components/UI'
import {
  getPlanner,
  savePlanner,
  getPlannerTimeline,
  savePlannerTimeline,
  resetPlannerData,
} from '../lib/storage'
import { Check, Edit2, Trash2, Download } from 'lucide-react'

export default function Planner() {
  const [planner, setPlanner] = useState(() => getPlanner())
  const [timeline, setTimeline] = useState(() => getPlannerTimeline())

  // Persist planner data.
  useEffect(() => {
    savePlanner(planner)
  }, [planner])

  // Persist timeline data.
  useEffect(() => {
    savePlannerTimeline(timeline)
  }, [timeline])

  // Safely convert values to numbers.
  const toNumber = (value) => {
    const number = Number(value)
    return Number.isFinite(number) ? number : 0
  }

  // Calculate registration estimates.
  const totalEstimated = planner.channels.reduce(
    (sum, channel) =>
      sum +
      Math.round(
        (toNumber(channel.audience) *
          toNumber(channel.conversion)) /
        100
      ),
    0
  )

  const totalActual = planner.channels.reduce(
    (sum, channel) => sum + toNumber(channel.actual),
    0
  )

  const remainingRegistrations = Math.max(
    toNumber(planner.goal) - totalActual,
    0
  )

  // Calculate budget.
  const totalBudgetAllocated = planner.budgetAllocations.reduce(
    (sum, item) => sum + toNumber(item.amount),
    0
  )

  const remainingBudget =
    toNumber(planner.budget) - totalBudgetAllocated

  // Update a channel.
  const updateChannel = (index, field, value) => {
    const newChannels = planner.channels.map((channel, i) => {
      if (i !== index) return channel

      let nextValue = value

      if (field === 'audience' || field === 'actual') {
        nextValue = Math.max(0, toNumber(value))
      }

      if (field === 'conversion') {
        nextValue = Math.min(
          100,
          Math.max(0, toNumber(value))
        )
      }

      return { ...channel, [field]: nextValue }
    })

    setPlanner((previous) => ({
      ...previous,
      channels: newChannels,
    }))
  }

  // Update a budget allocation.
  const updateBudget = (index, value) => {
    const newBudgets = planner.budgetAllocations.map(
      (item, i) =>
        i === index
          ? { ...item, amount: Math.max(0, toNumber(value)) }
          : item
    )

    setPlanner((previous) => ({
      ...previous,
      budgetAllocations: newBudgets,
    }))
  }

  // Update a timeline day.
  const updateDay = (dayIndex, field, value) => {
    setTimeline((previous) =>
      previous.map((day, index) =>
        index === dayIndex
          ? { ...day, [field]: value }
          : day
      )
    )
  }

  // Mark a timeline day as completed or incomplete.
  const toggleCompleted = (dayIndex) => {
    setTimeline((previous) =>
      previous.map((day, index) =>
        index === dayIndex
          ? { ...day, completed: !day.completed }
          : day
      )
    )
  }

  // Reset planner data.


  const handleReset = () => {
    const freshPlanner = {
      goal: 500,
      durationDays: 7,
      budget: 2000,
      channels: [
        { id: 'clubs', name: 'College clubs and student ambassadors', audience: 200, conversion: 10, actual: 0 },
        { id: 'whatsapp', name: 'WhatsApp student communities', audience: 150, conversion: 12, actual: 0 },
        { id: 'linkedin', name: 'LinkedIn and student communities', audience: 100, conversion: 8, actual: 0 },
        { id: 'email', name: 'Email outreach', audience: 80, conversion: 5, actual: 0 }
      ],
      budgetAllocations: [
        { id: 'creative', name: 'Promotional creative materials', amount: 300 },
        { id: 'ambassador', name: 'Student ambassador incentives', amount: 800 },
        { id: 'targeted', name: 'Optional targeted promotion', amount: 600 },
        { id: 'contingency', name: 'Contingency', amount: 300 }
      ]
    }

    const freshTimeline = Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      activity: '',
      channel: '',
      completed: false
    }))

    try {
      savePlanner(freshPlanner)
      savePlannerTimeline(freshTimeline)
      setPlanner(freshPlanner)
      setTimeline(freshTimeline)
      alert('Planner reset successfully!')
    } catch (error) {
      console.error('Reset failed:', error)
      alert('Reset failed. Check the browser console.')
    }
  }





  // Open exported JSON directly in a new browser tab.
  const handleExport = () => {
    // Open the tab immediately from the button click so that
    // the browser is less likely to block it as a pop-up.
    const jsonTab = window.open('', '_blank')

    if (!jsonTab) {
      window.alert(
        'The browser blocked the new tab. Allow pop-ups for your app and try again.'
      )
      return
    }

    try {
      const data = {
        exportedAt: new Date().toISOString(),
        goal: toNumber(planner.goal),
        durationDays: toNumber(planner.durationDays),
        budget: toNumber(planner.budget),

        channels: planner.channels.map((channel) => ({
          ...channel,
          audience: toNumber(channel.audience),
          conversion: toNumber(channel.conversion),
          actual: toNumber(channel.actual),
          estimatedRegistrations: Math.round(
            (toNumber(channel.audience) *
              toNumber(channel.conversion)) /
            100
          ),
        })),

        budgetAllocations: planner.budgetAllocations.map(
          (item) => ({
            ...item,
            amount: toNumber(item.amount),
          })
        ),

        timeline: timeline.map((day) => ({ ...day })),

        summary: {
          totalEstimatedRegistrations: totalEstimated,
          totalActualRegistrations: totalActual,
          remainingRegistrations,
          totalBudgetAllocated,
          remainingBudget,
        },
      }

      // Format and validate JSON.
      const json = JSON.stringify(data, null, 2)
      JSON.parse(json)

      // Build the page safely using textContent.
      // This displays the JSON as text, not as executable HTML.
      const doc = jsonTab.document

      doc.title = 'Campaign Planner - JSON Export'

      doc.documentElement.style.backgroundColor = '#f5f7fa'
      doc.body.style.margin = '0'
      doc.body.style.padding = '24px'
      doc.body.style.fontFamily = 'Arial, sans-serif'

      const heading = doc.createElement('h2')
      heading.textContent = 'Campaign Planner JSON Export'
      heading.style.color = '#2e7d32'

      const description = doc.createElement('p')
      description.textContent =
        'Your campaign data is shown below. You can copy it and save it as campaign-planner.json.'
      description.style.color = '#444'

      const copyButton = doc.createElement('button')
      copyButton.textContent = 'Copy JSON'
      copyButton.style.padding = '10px 16px'
      copyButton.style.marginBottom = '16px'
      copyButton.style.cursor = 'pointer'
      copyButton.style.backgroundColor = '#2e7d32'
      copyButton.style.color = '#ffffff'
      copyButton.style.border = 'none'
      copyButton.style.borderRadius = '6px'

      const output = doc.createElement('pre')
      output.textContent = json
      output.style.whiteSpace = 'pre-wrap'
      output.style.overflowWrap = 'anywhere'
      output.style.backgroundColor = '#ffffff'
      output.style.border = '1px solid #dce3dc'
      output.style.borderRadius = '10px'
      output.style.padding = '20px'
      output.style.lineHeight = '1.5'
      output.style.fontSize = '13px'
      output.style.color = '#222'
      output.style.overflowX = 'auto'

      copyButton.addEventListener('click', async () => {
        try {
          await jsonTab.navigator.clipboard.writeText(json)
          copyButton.textContent = 'Copied!'
        } catch (error) {
          // Clipboard access may be restricted in some browsers.
          copyButton.textContent =
            'Select the JSON below and copy it manually'
        }
      })

      doc.body.appendChild(heading)
      doc.body.appendChild(description)
      doc.body.appendChild(copyButton)
      doc.body.appendChild(output)
    } catch (error) {
      console.error('Campaign Planner export failed:', error)

      if (!jsonTab.closed) {
        jsonTab.document.body.textContent =
          'Could not generate the JSON export: ' +
          (error.message || 'Unknown error')
      }
    }
  }

  return (
    <div className="planner-page">
      <PageHeader
        eyebrow="CAMPAIGN PLANNER"
        title="Seven-day campaign plan"
        description="Edit audience, conversion, budget and daily activities. All changes are saved automatically."
      />

      <DemoNotice>
        All numbers are projections for a simulated campaign. Real
        results may differ.
      </DemoNotice>

      {/* Summary cards */}
      <div className="summary-grid">
        <Metric
          label="Goal"
          value={planner.goal}
          detail="Registrations"
          icon={Edit2}
          tone="green"
        />

        <Metric
          label="Estimated"
          value={totalEstimated}
          detail="Registrations (projected)"
          icon={Edit2}
          tone="mint"
        />

        <Metric
          label="Actual"
          value={totalActual}
          detail="Registrations recorded"
          icon={Check}
          tone="blue"
        />

        <Metric
          label="Remaining"
          value={remainingRegistrations}
          detail="Registrations needed"
          icon={Edit2}
          tone="lilac"
        />

        <Metric
          label="Budget"
          value={`₹${toNumber(planner.budget)}`}
          detail="Total budget"
          icon={Edit2}
          tone="green"
        />

        <Metric
          label="Allocated"
          value={`₹${totalBudgetAllocated}`}
          detail="Budget assigned"
          icon={Edit2}
          tone="mint"
        />

        <Metric
          label="Remaining"
          value={`₹${remainingBudget}`}
          detail="Budget left"
          icon={Edit2}
          tone="blue"
        />
      </div>

      {/* Channel allocations */}
      <Card className="channel-planner">
        <h3>Channel allocations</h3>

        <table className="editable-table">
          <thead>
            <tr>
              <th>Channel</th>
              <th>Audience</th>
              <th>Conversion %</th>
              <th>Est. registrations</th>
              <th>Actual registrations</th>
            </tr>
          </thead>

          <tbody>
            {planner.channels.map((channel, index) => (
              <tr key={channel.id ?? index}>
                <td>{channel.name}</td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={channel.audience}
                    onChange={(event) =>
                      updateChannel(
                        index,
                        'audience',
                        event.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={channel.conversion}
                    onChange={(event) =>
                      updateChannel(
                        index,
                        'conversion',
                        event.target.value
                      )
                    }
                  />
                </td>

                <td>
                  {Math.round(
                    (toNumber(channel.audience) *
                      toNumber(channel.conversion)) /
                    100
                  )}
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={channel.actual}
                    onChange={(event) =>
                      updateChannel(
                        index,
                        'actual',
                        event.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Budget allocations */}
      <Card className="budget-planner">
        <h3>Budget allocations (₹)</h3>

        <table className="editable-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {planner.budgetAllocations.map((item, index) => (
              <tr key={item.id ?? index}>
                <td>{item.name}</td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.amount}
                    onChange={(event) =>
                      updateBudget(index, event.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalBudgetAllocated > toNumber(planner.budget) && (
          <p className="warning" style={{ color: 'red' }}>
            Total allocation exceeds budget!
          </p>
        )}

        {remainingBudget >= 0 && (
          <p>Remaining budget: ₹{remainingBudget}</p>
        )}
      </Card>

      {/* Seven-day timeline */}
      <Card className="timeline-planner">
        <h3>Seven-day timeline</h3>

        <div className="timeline-grid">
          {timeline.map((day, index) => (
            <div
              key={day.day ?? index}
              className="day-card"
            >
              <div
                className="day-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <strong>Day {day.day ?? index + 1}</strong>

                <label style={{ marginLeft: 'auto' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(day.completed)}
                    onChange={() => toggleCompleted(index)}
                  />{' '}
                  Completed
                </label>
              </div>

              <textarea
                placeholder="Activity description"
                value={day.activity ?? ''}
                rows={3}
                onChange={(event) =>
                  updateDay(
                    index,
                    'activity',
                    event.target.value
                  )
                }
                style={{ width: '100%' }}
              />

              <select
                value={day.channel ?? ''}
                onChange={(event) =>
                  updateDay(
                    index,
                    'channel',
                    event.target.value
                  )
                }
                style={{
                  width: '100%',
                  marginTop: '4px',
                }}
              >
                <option value="">-- Select channel --</option>

                {planner.channels.map((channel, channelIndex) => (
                  <option
                    key={channel.id ?? channelIndex}
                    value={channel.id ?? ''}
                  >
                    {channel.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div
        className="planner-actions"
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >

        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: '10px 16px',
            backgroundColor: '#ffffff',
            color: '#2e7d32',
            border: '1px solid #2e7d32',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Trash2 size={16} />
          Reset to demo data
        </button>


        <Button variant="primary" onClick={handleExport}>
          <Download size={16} style={{ marginRight: '4px' }} />
          View JSON Export
        </Button>
      </div>
    </div>
  )
}
