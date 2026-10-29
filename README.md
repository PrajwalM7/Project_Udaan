# Project Udaan — AI Workshop Growth Engine

A zero-paid-spend prototype for the NxtWave Growth Intern challenge. It combines a personalized project matcher, a referral experience, and a growth analytics dashboard for a simulated seven-day campaign targeting 500 registrations.

## Features

- Responsive premium SaaS interface
- Rules-based project matcher (no paid LLM/API needed)
- Project Passport with copy/share actions and a 60-minute roadmap
- Anonymous local referral code and referral-link experience
- Browser-local demo event logging
- Growth dashboard with editable channel assumptions, funnel, pacing chart, and message experiment
- Seven-day campaign playbook
- Visible simulation notices and reset demo-data control

## Important limitations

- Campaign numbers are simulated planning assumptions, not real performance.
- The project matcher uses deterministic templates. It is not a live AI model.
- localStorage is local to the browser profile; it is not shared analytics across users/devices.
- Referral visits do not prove that a unique real person visited.
- This demo does not submit a real workshop registration. Connect the official registration destination only if it is provided and authorized.
- No backend, authentication, or cross-device analytics is included.

## Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm
- VS Code (recommended)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## GitHub and Vercel

1. Create a GitHub repository and push this project.
2. Import the repository in Vercel.
3. Use build command `npm run build`.
4. Use output directory `dist`.
5. Deploy and test the public URL on desktop and mobile.

This is a static Vite SPA and uses browser localStorage. Do not add secrets to client-side code.

## Challenge submission reminder

Prepare a maximum five-slide/two-page growth plan, a working asset link, two or three authentic AI learning examples, and a three-minute video. Clearly label all simulated figures.
