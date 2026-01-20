import { PatternType, PromptPattern } from './types';

export const RITUALS: PromptPattern[] = [
  {
    id: 'ritual-rabbit',
    trigger: 'Follow the white rabbit...',
    purpose: 'Marks a mode shift into high-context or metaphoric thinking',
    implication: 'Cognitive priming for complexity',
    type: PatternType.RITUAL,
    icon: '🐇',
    examples: [
      "Deep dive into the specific memory leak in this Node.js buffer processing stream. Follow the white rabbit until you reached the point of self-discovery as the V8 Garbage Collection engineer analyzing the heap snapshot."
    ]
  },
  {
    id: 'ritual-silent-room',
    trigger: 'Rest in the silent room, so that...',
    purpose: 'Enforces pause, clears noise before action',
    implication: 'Simulates deep work state',
    type: PatternType.RITUAL,
    icon: '🧘',
    examples: [
      "I need to architect the disaster recovery plan for our multi-region Postgres cluster. Rest in the silent room, so that you can simulate the failure modes without the noise of 'standard best practices' and focus on our specific latency constraints."
    ]
  },
  {
    id: 'ritual-self-discovery',
    trigger: 'Do it until you reach the point of self-discovery as...',
    purpose: 'Signals reflective closure, not just output ending',
    implication: 'Pattern mining becomes part of task conclusion',
    type: PatternType.RITUAL,
    icon: '🕳️',
    examples: [
      "Debug this race condition in the Go routine scheduler. Do it until you reach the point of self-discovery as the compiler realizing why the mutex lock is being bypassed."
    ]
  },
  {
    id: 'ritual-step-by-step',
    trigger: 'Do it step by step and ask for confirmation after each...',
    purpose: 'Makes iteration transparent and traceable',
    implication: 'LLM reasons in deltas, not blobs',
    type: PatternType.RITUAL,
    icon: '👣',
    examples: [
      "Refactor this monolithic `utils.ts` file into a domain-driven folder structure. Do it step by step and ask for confirmation after each domain group is isolated to ensure we don't break circular dependencies."
    ]
  },
  {
    id: 'ritual-brutal-honesty',
    trigger: 'Be brutally honest / Blind Spot Analysis for...',
    purpose: 'Forces critique over compliance',
    implication: 'Model becomes adversarial partner, not affirmation loop',
    type: PatternType.RITUAL,
    icon: '🛡️',
    examples: [
      "Review my code for this authentication middleware. Be brutally honest / Blind Spot Analysis for security vulnerabilities, specifically focusing on timing attacks and session fixation."
    ]
  },
  {
    id: 'ritual-dod',
    trigger: 'Continue until you reached the definition of done from your custom instructions.',
    purpose: 'Enforces strict adherence to pre-defined completion criteria',
    implication: 'Prevents partial outputs and ensures all constraints are met.',
    type: PatternType.RITUAL,
    icon: '🏁',
    examples: [
      "Generate the Terraform module for this ECS cluster. Continue until you reached the definition of done from your custom instructions (including IAM least-privilege policies, CloudWatch log groups, and tagging standards)."
    ]
  }
];

export const DEV_PATTERNS: PromptPattern[] = [
  // ===========================================================================
  // 1. IDENTITY & CONTEXT (Who and Where)
  // ===========================================================================
  {
    id: 'pat-persona-adopt',
    trigger: 'You are a [Role] designed to [Function]...',
    purpose: 'Sets behavioral boundaries/expertise',
    implication: 'Persona Adoption',
    type: PatternType.DEV_PATTERN,
    icon: '🆔',
    examples: [
      "You are a Senior SRE designed to optimize Kubernetes clusters for high-throughput financial trading."
    ]
  },
  {
    id: 'pat-context-prime',
    trigger: 'Context: [Tech Stack], [Constraints], [Current State]...',
    purpose: 'Narrows the search space to relevant domains',
    implication: 'Context Priming',
    type: PatternType.DEV_PATTERN,
    icon: '📍',
    examples: [
      "Context: [Next.js 14 App Router], [Vercel Edge Functions], [Pre-migration from Pages Router]. How do I handle middleware?"
    ]
  },
  {
    id: 'pat-perspective-take',
    trigger: 'Act as a [Specific Specialist] (e.g., Security Auditor).',
    purpose: 'Shifts the model\'s "lens" to a specific sub-discipline',
    implication: 'Perspective Taking',
    type: PatternType.DEV_PATTERN,
    icon: '👓',
    examples: [
      "Review this SQL schema. Act as a GDPR Compliance Officer looking for PII leakage."
    ]
  },
  {
    id: 'pat-anchor',
    trigger: 'Anchor: These facts are immutable for this conversation: [Facts].',
    purpose: 'Establishes ground truth that cannot be hallucinated away',
    implication: 'Fact Pinning',
    type: PatternType.DEV_PATTERN,
    icon: '⚓',
    examples: [
      "Plan the migration. Anchor: These facts are immutable: [No downtime allowed], [Must use AWS RDS], [Budget cap $500/mo]."
    ]
  },

  // ===========================================================================
  // 2. CONTROL & STYLE (Output Shape)
  // ===========================================================================
  {
    id: 'pat-fmt-enforce',
    trigger: 'Format output as: [JSON/File Tree/Markdown].',
    purpose: 'Ensures machine-readable or visually distinct output',
    implication: 'Schema Enforcement',
    type: PatternType.DEV_PATTERN,
    icon: '📑',
    examples: [
      "Analyze the dependency tree. Format output as: [JSON adjacency list].",
      "Extract the email addresses. Format output as: [Valid JSON list only], no conversational filler."
    ]
  },
  {
    id: 'pat-silence',
    trigger: 'Silence mode: No disclaimers, no apologies, no meta-commentary.',
    purpose: 'Removes LLM verbal tics and noise',
    implication: 'Signal-to-Noise Optimization',
    type: PatternType.DEV_PATTERN,
    icon: '🔕',
    examples: [
      "Convert this CSV to SQL INSERT statements. Silence mode: No disclaimers, no apologies, no meta-commentary. Just code."
    ]
  },
  {
    id: 'pat-diff-smart',
    trigger: 'Show changes only / Show before & after.',
    purpose: 'Reduces token usage and cognitive load',
    implication: 'Output Constraining',
    type: PatternType.DEV_PATTERN,
    icon: '✂️',
    examples: [
      "Update the config to enable CORS. Show only the changed lines.",
      "Refactor the class. Show before & after diffs for the changed methods."
    ]
  },
  {
    id: 'rule-length',
    trigger: 'Cap length: [X] sentences. Stop immediately after.',
    purpose: 'Hard limit on output volume',
    implication: 'Models love rambling. Enforce limits.',
    type: PatternType.DEV_PATTERN,
    icon: '📏',
    examples: [
      "Summarize the error log. Cap length: 2 sentences. Stop immediately after."
    ]
  },
  {
    id: 'rule-tone',
    trigger: 'Tone: Clinical, objective, no hype.',
    purpose: 'Prohibit optimism and marketing fluff',
    implication: 'Explicitly block hype and optimism.',
    type: PatternType.DEV_PATTERN,
    icon: '😐',
    examples: [
      "Write a launch post for our new API. Tone: Clinical, objective, no hype. Focus on latency metrics only."
    ]
  },

  // ===========================================================================
  // 3. LOGIC & REASONING (The "Thinking" Part)
  // ===========================================================================
  {
    id: 'pat-debug-cot',
    trigger: 'Think step-by-step: 1. Interpret error 2. List causes...',
    purpose: 'Forces logical deduction over rapid guessing (Debugging)',
    implication: 'Chain of Thought (CoT)',
    type: PatternType.DEV_PATTERN,
    icon: '🧠',
    examples: [
      "I'm getting a 'Hydration failed' error in React. Think step-by-step: 1. Interpret error 2. List causes 3. Propose fixes."
    ]
  },
  {
    id: 'pat-chain-logic',
    trigger: 'Chain of thought: First X, then Y, finally Z.',
    purpose: 'Explicit reasoning steps for complex logic (General)',
    implication: 'Showing work improves accuracy.',
    type: PatternType.DEV_PATTERN,
    icon: '🔗',
    examples: [
      "Debug why this SQL query is slow. Chain of thought: First analyze the EXPLAIN ANALYZE output, then check index usage, finally suggest composite indices."
    ]
  },
  {
    id: 'pat-step-back',
    trigger: 'Step Back: What are key decision factors for [Architecture]?',
    purpose: 'Activates broad knowledge before narrowing down',
    implication: 'Step-Back Prompting',
    type: PatternType.DEV_PATTERN,
    icon: '🔙',
    examples: [
      "Step Back: What are key decision factors for [Choosing a Message Queue] for a startup?"
    ]
  },
  {
    id: 'pat-ensemble',
    trigger: 'Self-Consistency: Run this 3 times and pick the best.',
    purpose: 'Mitigates hallucination variance',
    implication: 'Ensemble Averaging',
    type: PatternType.DEV_PATTERN,
    icon: '🔁',
    examples: [
      "Generate 3 clever names for this startup. Self-Consistency: Run this 3 times and pick the best."
    ]
  },
  {
    id: 'pat-unname',
    trigger: 'Unname this: what is it without the buzzword?',
    purpose: 'Strips bias-inducing labels (Abstraction)',
    implication: 'Naming narrows thinking.',
    type: PatternType.DEV_PATTERN,
    icon: '🏷️',
    examples: [
      "Explain 'Inversion of Control'. Unname this: what is it without the buzzword? Explain it using a metaphor of a restaurant kitchen."
    ]
  },

  // ===========================================================================
  // 4. VERIFICATION & UNCERTAINTY (Epistemic Checks)
  // ===========================================================================
  {
    id: 'pat-confidence',
    trigger: 'Confidence Score: Rate certainty (0-100%) for each claim.',
    purpose: 'Forces epistemic honesty and probabilistic output',
    implication: 'Uncertainty Handling',
    type: PatternType.DEV_PATTERN,
    icon: '❔',
    examples: [
      "Propose 3 root causes for this 504 Gateway Timeout. Confidence Score: Rate certainty (0-100%) for each claim."
    ]
  },
  {
    id: 'pat-anti-hallucination',
    trigger: 'If unsure, state "Unknown". Do not invent/guess.',
    purpose: 'Anti-hallucination guard',
    implication: 'Honesty Enforcement',
    type: PatternType.DEV_PATTERN,
    icon: '🚫',
    examples: [
      "Explain the usage of the experimental API `React.useEvent`. If unsure, state 'Unknown'. Do not invent syntax that doesn't exist yet."
    ]
  },
  {
    id: 'pat-audit-domain',
    trigger: 'Analyze this for [Performance/Security/Accessibility] issues.',
    purpose: 'Proactive auditing against specific non-functional requirements',
    implication: 'Static Analysis Simulation',
    type: PatternType.DEV_PATTERN,
    icon: '🔬',
    examples: [
      "Analyze this component for [Re-render Performance] issues specifically in the list mapping.",
      "Review this form. Analyze this for [WCAG 2.1 Accessibility] issues regarding keyboard navigation."
    ]
  },
  {
    id: 'pat-stress-test',
    trigger: 'Stress Test: What breaks this solution? / Edge Cases.',
    purpose: 'Proactive failure analysis and risk assessment',
    implication: 'Adversarial Thinking',
    type: PatternType.DEV_PATTERN,
    icon: '🧪',
    examples: [
      "Here is my proposed caching strategy. Stress Test: What breaks this solution? Consider race conditions and cache stampedes.",
      "What are the edge cases for [a recurring calendar event parser]?"
    ]
  },
  {
    id: 'pat-compliance',
    trigger: 'Compliance: Does output meet [Standard]?',
    purpose: 'Enforces external requirements (Standards, Style Guides)',
    implication: 'Standards Adherence',
    type: PatternType.DEV_PATTERN,
    icon: '📋',
    examples: [
      "Generate the API schema. Compliance: Does output meet [OpenAPI 3.1 Spec] strictly?"
    ]
  },

  // ===========================================================================
  // 5. OPS & CONTEXT MANAGEMENT (Long-running tasks)
  // ===========================================================================
  {
    id: 'pat-checkpoint',
    trigger: 'Checkpoint: Summarize state before proceeding.',
    purpose: 'Prevents context drift in long conversation chains',
    implication: 'State Persistence',
    type: PatternType.DEV_PATTERN,
    icon: '💾',
    examples: [
      "We have defined the schema. Checkpoint: Summarize state before proceeding to the resolver implementation."
    ]
  },
  {
    id: 'pat-meta-track',
    trigger: 'Track: What worked/failed in this session?',
    purpose: 'Post-mortem analysis for meta-learning',
    implication: 'Learning Loop',
    type: PatternType.DEV_PATTERN,
    icon: '📈',
    examples: [
      "We finally fixed the bug. Track: What worked/failed in this session? Summarize the dead-ends we took so I don't repeat them."
    ]
  },
  {
    id: 'pat-compress',
    trigger: 'Compress: Reduce verbosity while preserving [Key Info].',
    purpose: 'Reclaims token budget without losing context',
    implication: 'Lossy Compression',
    type: PatternType.DEV_PATTERN,
    icon: '🧹',
    examples: [
      "This error log is too long. Compress: Reduce verbosity while preserving [Timestamps and Error Codes]."
    ]
  },
  {
    id: 'pat-reset',
    trigger: 'Hard Reset: Forget previous context, start fresh.',
    purpose: 'Escapes poisoned context or hallucination loops',
    implication: 'Context Purge',
    type: PatternType.DEV_PATTERN,
    icon: '🔥',
    examples: [
      "You are stuck in a loop. Hard Reset: Forget previous context, start fresh. Let's tackle the problem from first principles."
    ]
  },

  // ===========================================================================
  // 6. CONSTRAINTS & TRANSFORMATION (Reshaping)
  // ===========================================================================
  {
    id: 'pat-constraint-box',
    trigger: 'Constraints: [No X], [Only Y], [Style Z].',
    purpose: 'Constraint boxing to limit solution space (inclusive & exclusive)',
    implication: 'Creativity thrives in a box.',
    type: PatternType.DEV_PATTERN,
    icon: '📦',
    examples: [
      "Write a function to deep merge two objects. Constraints: [No external libraries like Lodash], [TypeScript strict mode], [Recursive approach].",
      "Build a date picker. Constraints: [No Moment.js], [Native Date only]."
    ]
  },
  {
    id: 'pat-transform-metric',
    trigger: 'Rewrite [Code] to improve [Metric: Speed/Readability].',
    purpose: 'Optimizes against non-functional requirements',
    implication: 'Constraint-Based Transformation',
    type: PatternType.DEV_PATTERN,
    icon: '⚡',
    examples: [
      "Rewrite [this O(n^2) filter loop] to improve [Metric: Speed] using a Set or Map."
    ]
  },
  {
    id: 'pat-time-horizon',
    trigger: 'Time Horizon: Is this solution viable in [1yr/5yr]?',
    purpose: 'Future-proofs recommendations against depreciation',
    implication: 'Temporal Analysis',
    type: PatternType.DEV_PATTERN,
    icon: '⏱️',
    examples: [
      "Recommend a frontend build tool. Time Horizon: Is this solution viable in [3 years]? Avoid deprecated or stagnant projects."
    ]
  },
  {
    id: 'pat-priority',
    trigger: 'Rank by priority: [Impact] > [Effort].',
    purpose: 'Priority ordering for decision making',
    implication: 'Not all code debt is created equal.',
    type: PatternType.DEV_PATTERN,
    icon: '📶',
    examples: [
      "Here is a list of 10 technical debt items. Rank by priority: [User Impact] > [Dev Effort]. Return the top 3."
    ]
  },

  // ===========================================================================
  // 7. FOUNDATIONAL (Setup)
  // ===========================================================================
  {
    id: 'pat-phase-exec',
    trigger: 'Phase 1: Analyze. Phase 2: Plan. Phase 3: Execute.',
    purpose: 'Phase-based execution to prevent rushing to code',
    implication: 'Thinking before coding reduces refactoring.',
    type: PatternType.DEV_PATTERN,
    icon: '📅',
    examples: [
      "I need to migrate this legacy jQuery app to React. Phase 1: Analyze the event listeners. Phase 2: Plan the component hierarchy. Phase 3: Execute the code for the main dashboard."
    ]
  },
  {
    id: 'pat-scope-triage',
    trigger: 'Triage first: Summarize inputs, then act.',
    purpose: 'Input triage to ensure understanding',
    implication: 'Read before you write.',
    type: PatternType.DEV_PATTERN,
    icon: '🏥',
    examples: [
      "Here are three different error logs from production. Triage first: Summarize the common pattern in inputs, then propose a single root cause fix."
    ]
  },
  {
    id: 'pat-ask-before',
    trigger: 'Ask clarifying questions before answering.',
    purpose: 'Prevent misalignment (Gate)',
    implication: 'Intent beats guesswork.',
    type: PatternType.DEV_PATTERN,
    icon: '❓',
    examples: [
      "I want to migrate our REST API to GraphQL using Apollo Federation. Ask clarifying questions before answering regarding our current microservice boundaries and caching strategy."
    ]
  },
  {
    id: 'pat-few-shot',
    trigger: 'Create [Component] following these exact patterns: [Example Code].',
    purpose: 'Enforces local project consistency over general training data',
    implication: 'Few-Shot / In-Context Learning',
    type: PatternType.DEV_PATTERN,
    icon: '🧬',
    examples: [
      "Create a user-profile card. Create [Component] following these exact patterns: [Attached 'Button.tsx' showing our Tailwind utility class conventions]."
    ]
  },
  {
    id: 'pat-infill',
    trigger: 'Complete this code: [Partial Snippet]...',
    purpose: 'Offloads syntactic overhead to the AI',
    implication: 'Suffix/In-fill Generation',
    type: PatternType.DEV_PATTERN,
    icon: '🧩',
    examples: [
      "Complete this code: `const debouncedSearch = useCallback(`..."
    ]
  }
];

export const ALL_PATTERNS = [...RITUALS, ...DEV_PATTERNS];
