const projectBank = {
  'Web development': {
    beginner: {
      title: 'Smart Study Planner',
      problem: 'Students struggle to turn a large syllabus into a manageable daily plan.',
      features: ['Add subjects and tasks', 'Prioritize by deadline', 'Track daily completion'],
      tools: ['React', 'CSS', 'Local storage'],
      roadmap: [['0–10 min', 'Define the task and sketch the interface'], ['10–25 min', 'Build the task form and list'], ['25–40 min', 'Add completion and priority controls'], ['40–55 min', 'Save tasks locally and polish the UI'], ['55–60 min', 'Test the main user flow']]
    },
    intermediate: {
      title: 'AI Resume Bullet Coach',
      problem: 'Students often describe project work without clearly explaining impact.',
      features: ['Enter a project description', 'Choose a target role', 'Generate structured bullet templates'],
      tools: ['React', 'JavaScript', 'Rule-based text templates'],
      roadmap: [['0–10 min', 'Choose target role and define input fields'], ['10–25 min', 'Build the form and examples'], ['25–40 min', 'Create rule-based bullet suggestions'], ['40–55 min', 'Add copy and edit actions'], ['55–60 min', 'Test and refine output']]
    },
    advanced: {
      title: 'Portfolio Project Tracker',
      problem: 'Developers need a simple way to communicate project progress and outcomes.',
      features: ['Create project milestones', 'Track status and blockers', 'Export a progress summary'],
      tools: ['React', 'Charts', 'Local storage'],
      roadmap: [['0–10 min', 'Define data model and states'], ['10–25 min', 'Build milestone management'], ['25–40 min', 'Add status summaries'], ['40–55 min', 'Add progress visualization'], ['55–60 min', 'Test and demo']]
    }
  },
  'Productivity': {
    beginner: {
      title: 'Focus Sprint Timer',
      problem: 'Students find it hard to start focused study sessions.',
      features: ['Choose a focus duration', 'Track completed sessions', 'Show a simple session summary'],
      tools: ['React', 'JavaScript', 'CSS'],
      roadmap: [['0–10 min', 'Design timer states'], ['10–25 min', 'Build controls and display'], ['25–40 min', 'Implement timer behavior'], ['40–55 min', 'Add session history'], ['55–60 min', 'Test start, pause, and reset']]
    },
    intermediate: {
      title: 'Meeting Notes Action Extractor',
      problem: 'Action items are often lost in long meeting notes.',
      features: ['Paste notes', 'Extract lines with action keywords', 'Organize tasks by owner'],
      tools: ['React', 'JavaScript', 'Text processing'],
      roadmap: [['0–10 min', 'Define note and action formats'], ['10–25 min', 'Build input and output panels'], ['25–40 min', 'Implement keyword extraction'], ['40–55 min', 'Add editing and copy actions'], ['55–60 min', 'Test sample notes']]
    },
    advanced: {
      title: 'Personal Workflow Dashboard',
      problem: 'People need one place to review tasks, deadlines, and progress.',
      features: ['Task prioritization', 'Progress summaries', 'Deadline-based filters'],
      tools: ['React', 'Charts', 'Local storage'],
      roadmap: [['0–10 min', 'Define workflow data'], ['10–25 min', 'Build task management'], ['25–40 min', 'Add filters'], ['40–55 min', 'Add analytics'], ['55–60 min', 'Test and demo']]
    }
  },
  'Education': {
    beginner: {
      title: 'Quiz Card Generator',
      problem: 'Students need a fast way to turn notes into revision questions.',
      features: ['Enter topic notes', 'Create editable question cards', 'Mark cards as learned'],
      tools: ['React', 'JavaScript', 'Template-based generation'],
      roadmap: [['0–10 min', 'Define question card structure'], ['10–25 min', 'Build note input'], ['25–40 min', 'Generate cards using simple templates'], ['40–55 min', 'Add flip and learned states'], ['55–60 min', 'Test and polish']]
    },
    intermediate: {
      title: 'Revision Gap Finder',
      problem: 'Learners need to identify which topics need more revision.',
      features: ['Rate confidence per topic', 'Prioritize weak topics', 'Generate a revision plan'],
      tools: ['React', 'Rule-based scoring', 'Charts'],
      roadmap: [['0–10 min', 'Define confidence scale'], ['10–25 min', 'Build topic inputs'], ['25–40 min', 'Calculate priority scores'], ['40–55 min', 'Generate revision plan'], ['55–60 min', 'Test sample topics']]
    },
    advanced: {
      title: 'Adaptive Learning Planner',
      problem: 'A static timetable does not respond to changing learner progress.',
      features: ['Track topic mastery', 'Reorder upcoming tasks', 'Show progress trends'],
      tools: ['React', 'Charts', 'Rule-based recommendations'],
      roadmap: [['0–10 min', 'Define mastery model'], ['10–25 min', 'Build progress inputs'], ['25–40 min', 'Implement prioritization'], ['40–55 min', 'Visualize progress'], ['55–60 min', 'Validate recommendations']]
    }
  },
  'Agriculture': {
    beginner: {
      title: 'Smart Garden Reminder',
      problem: 'New gardeners forget watering and care routines.',
      features: ['Choose a plant type', 'Create care reminders', 'View a simple care checklist'],
      tools: ['React', 'JavaScript', 'Local storage'],
      roadmap: [['0–10 min', 'Choose sample plant profiles'], ['10–25 min', 'Build plant selection'], ['25–40 min', 'Create care checklist'], ['40–55 min', 'Add saved plant state'], ['55–60 min', 'Test and demo']]
    },
    intermediate: {
      title: 'Farm Input Cost Planner',
      problem: 'Small growers need to estimate input costs before a growing cycle.',
      features: ['Enter area and input quantities', 'Calculate estimated costs', 'Compare scenarios'],
      tools: ['React', 'JavaScript', 'Charts'],
      roadmap: [['0–10 min', 'Define cost inputs'], ['10–25 min', 'Build the calculator'], ['25–40 min', 'Add scenario comparison'], ['40–55 min', 'Add summary chart'], ['55–60 min', 'Check calculations']]
    },
    advanced: {
      title: 'Crop Decision Notebook',
      problem: 'Farmers need to compare crop options against transparent assumptions.',
      features: ['Enter crop assumptions', 'Compare estimated costs and returns', 'Export a decision summary'],
      tools: ['React', 'Charts', 'Rule-based scoring'],
      roadmap: [['0–10 min', 'Define assumptions and inputs'], ['10–25 min', 'Build crop comparison form'], ['25–40 min', 'Calculate estimates'], ['40–55 min', 'Visualize comparison'], ['55–60 min', 'Test edge cases']]
    }
  }
}

export function getProject(level, interest, goal) {
  const normalizedLevel = ['beginner', 'intermediate', 'advanced'].includes(level) ? level : 'beginner'
  const category = projectBank[interest] || projectBank['Web development']
  const project = category[normalizedLevel]
  return {
    ...project,
    interest,
    level: normalizedLevel,
    goal,
    goalTip: goal === 'Placement portfolio'
      ? 'Keep the README clear and describe the problem, your contribution, and what you learned.'
      : goal === 'Hackathon'
        ? 'Start with one clear user problem and make the core flow work before adding extra features.'
        : 'Explain the input, the logic, and the output so another learner can reproduce the result.',
    generatedAt: new Date().toISOString()
  }
}
