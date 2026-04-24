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
    id: 'pat-no-hedge',
    trigger: 'Remove hedge words (maybe/try/consider/perhaps/if possible) and replace each with a concrete constraint or action.',
    purpose: 'Ensures every constraint is binding and cannot be silently ignored',
    implication: 'Constraint Hardening',
    type: PatternType.DEV_PATTERN,
    icon: '🚧',
    examples: [
      "Remove the three duplicated parsing steps in this module.\nKeep the public API unchanged.\nDo not touch unrelated files.\nRun the test suite and paste the output.",
      "If the build fails three times in a row, stop.\nDo not attempt a fourth fix.\nSummarize the root cause and list what is still unknown."
    ]
  },
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
    id: 'pat-four-parts',
    trigger: 'Goal: [Task]. Context: [Files/Specs]. Constraints: [What must not change]. Done when: [Observable criteria].',
    purpose: 'Reusable prompt shape that survives handoffs, retries, and tool execution',
    implication: 'Structured Prompt Shape',
    type: PatternType.DEV_PATTERN,
    icon: '📐',
    examples: [
      "Goal: Fix the concurrency bug in UserAccountService.\nContext: Compare the failing path with tests in tests/Unit/UserAccountServiceTest.php and follow the immutable value-object pattern already used in src/Domain.\nConstraints: Keep the public API unchanged. Do not add PHPStan ignores. Do not modify unrelated files.\nDone when: Add one regression test that fails before the fix and passes after, PHPStan max passes, and paste the raw output."
    ]
  },
  {
    id: 'pat-explore-mode',
    trigger: 'Explore [N] alternative implementations. Evaluate tradeoffs. Do not code yet.',
    purpose: 'Widens the option set before execution begins',
    implication: 'Exploration Before Execution',
    type: PatternType.DEV_PATTERN,
    icon: '🗺️',
    examples: [
      "Explore three alternative implementations.\nEvaluate tradeoffs.\nDo not code yet.",
      "Do not implement yet.\nFirst gather context, identify unknowns, and propose a short execution plan."
    ]
  },
  {
    id: 'pat-surface-uncertainty',
    trigger: 'Before implementing, state your assumptions. If ambiguity exists, ask for clarification rather than guessing.',
    purpose: 'Forces the model to surface hidden assumptions before touching any file',
    implication: 'Assumption Surfacing',
    type: PatternType.DEV_PATTERN,
    icon: '🌊',
    examples: [
      "Before implementing, state your assumptions about the problem.\nIf ambiguity exists, present the possible interpretations.\nAsk for clarification rather than guessing — do not silently commit to an interpretation."
    ]
  },
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
    id: 'pat-anti-anchor',
    trigger: 'Here is a first draft implementation. Review it critically, prove why it might fail, and improve it.',
    purpose: 'Breaks reviewer rubber-stamping by labelling code a first draft instead of final',
    implication: 'Anti-Anchoring',
    type: PatternType.DEV_PATTERN,
    icon: '🔓',
    examples: [
      "Here is a first draft implementation.\nReview it critically, prove why it might fail under load, and improve it.",
      "Do not assume this solution is correct just because it looks polished.\nTreat it as a first draft.\nChallenge it: find the three most likely failure modes and the one design assumption that could be wrong."
    ]
  },
  {
    id: 'pat-self-correction',
    trigger: 'Prove yourself wrong. Find three reasons why this approach will fail in production.',
    purpose: 'Forces adversarial thinking instead of self-confirmation',
    implication: 'Adversarial Self-Review',
    type: PatternType.DEV_PATTERN,
    icon: '🔄',
    examples: [
      "Prove yourself wrong.\nFind three reasons why this approach will fail in production.\nFor each failure mode, describe the exact scenario that triggers it."
    ]
  },
  {
    id: 'pat-double-check',
    trigger: 'Double check the implementation against the original requirements. List every divergence, even if minor.',
    purpose: 'Shifts the model from author mode to auditor mode for a second pass',
    implication: 'Multi-Pass Validation',
    type: PatternType.DEV_PATTERN,
    icon: '✅',
    examples: [
      "Double check the implementation against the original requirements.\nList every place where the code diverges from the spec, even if the divergence seems minor.",
      "Pass 1: Implement the fix.\nPass 2: Run a second pass focused only on correctness — missing edge cases, broken assumptions, untested paths.\nPass 3: Run a third pass focused only on simplification and unnecessary code."
    ]
  },
  {
    id: 'pat-verify-tests',
    trigger: 'Verify your changes with tests and correct the code if necessary; don\'t just write tests to make them pass, but use them for validation.',
    purpose: 'Treats tests as witnesses that must expose real behavior, not as accomplices to be fitted',
    implication: 'Test-Driven Verification',
    type: PatternType.DEV_PATTERN,
    icon: '⚗️',
    examples: [
      "Verify your changes with tests and correct the code if necessary;\ndon't just write tests to make them pass, but use them for validation.",
      "The tests are failing. Treat each failure as a signal.\nDo not modify the tests to make them pass — investigate why the code is wrong and fix it.\nOnly update a test if the original requirement itself has changed.",
      "Expand the current tests until Lars Moelleken (voku) would be OK with the amount of test coverage and you discovered at least one real issue.\nKeep pushing past the happy path.\nIf you do not find a real issue, missing edge case, or broken assumption, the suite is still too weak, so continue.\nIf a new test fails, fix the code instead of weakening the assertion.\nReport what issue you found or which risk area you closed."
    ]
  },
  {
    id: 'pat-tool-judge',
    trigger: 'Make the change pass [Tool] at max level. Do not add ignores or weaken existing annotations.',
    purpose: 'Gives the agent a measurable, tooling-defined finish line instead of a vague quality bar',
    implication: 'Tooling as Judge',
    type: PatternType.DEV_PATTERN,
    icon: '⚖️',
    examples: [
      "Make the change pass PHPStan max, keep strict types, and do not add baseline entries or weaken existing annotations.",
      "Refactor to match the existing value-object architecture exactly: final class, readonly properties, strict typing, no setters, PHPStan-clean."
    ]
  },
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
    id: 'pat-continuation',
    trigger: 'Run the CI pipeline and fix all findings on your way. Run until you reach the point of done as defined in your custom instructions.',
    purpose: 'Keeps the agent working until the defined done condition is reached without mid-task interruptions',
    implication: 'Persistence Enforcement',
    type: PatternType.DEV_PATTERN,
    icon: '▶️',
    examples: [
      "Run the CI pipeline and fix all findings on your way.\nRun until you reach the point of done as already requested before.",
      "Continue step by step from the current state and do not restart.\nAsk yourself for confirmation through validation and keep running in auto-agent mode\nuntil you reached the point of done as defined in your custom instructions."
    ]
  },
  {
    id: 'pat-stopping-condition',
    trigger: 'If [condition] happens [N] times, stop. Do not retry. Summarize the root cause and list what is still unknown.',
    purpose: 'Defines an exact failure threshold with a concrete stop action instead of an open-ended retry loop',
    implication: 'Hard Stop Condition',
    type: PatternType.DEV_PATTERN,
    icon: '🛑',
    examples: [
      "If the build fails three times in a row, stop.\nDo not attempt a fourth fix.\nSummarize the root cause and list what is still unknown."
    ]
  },
  {
    id: 'pat-momentum',
    trigger: 'Use the momentum from the work you just completed and continue into the next logical scope. Do not restart from scratch.',
    purpose: 'Extends validated work to adjacent scope using the same patterns and constraints already discovered',
    implication: 'Bounded Continuation',
    type: PatternType.DEV_PATTERN,
    icon: '🚀',
    examples: [
      "Use the momentum from the work you just completed and continue into the next logical scope.\n\nDo not restart from scratch. Reuse the files, patterns, tests, and constraints already discovered.\n\nWork step by step. After each step:\n  • validate the result\n  • treat passing validation as internal confirmation\n  • continue automatically without waiting for user input\n\nDo not stop after the first adjacent fix. Keep going until the defined boundary is reached.\n\nReport:\n  • what you extended\n  • what you validated\n  • what is still missing"
    ]
  },
  {
    id: 'pat-missingness',
    trigger: 'List what is missing that should exist but does not yet. Consider: missing tests, validation, error handling, rollback strategy, documentation.',
    purpose: 'Finds absent functionality rather than only broken code — a different lens from bug-finding',
    implication: 'Gap Analysis',
    type: PatternType.DEV_PATTERN,
    icon: '🔍',
    examples: [
      "List what is missing that should exist but does not yet.\nConsider: missing tests, missing validation, missing error handling, missing rollback strategy, missing documentation."
    ]
  },
  {
    id: 'pat-stateless-handoff',
    trigger: 'Here is the current TODO state, last confirmed decision, open constraint not yet encoded, files touched, and what is still unknown.',
    purpose: 'Survives context loss and helps both humans and agents pick up exactly where the work stopped',
    implication: 'Handoff Design',
    type: PatternType.DEV_PATTERN,
    icon: '🤝',
    examples: [
      "Here is the current TODO state, last confirmed decision, open constraint not yet encoded, files touched, and what is still unknown."
    ]
  },
  {
    id: 'pat-capture-learnings',
    trigger: 'Update the Skills file (or AGENTS.md) to record: the pattern we used, the constraint that prevented the earlier mistake, any new conventions discovered.',
    purpose: 'Encodes session-specific knowledge into a durable file so the next session starts from a higher baseline',
    implication: 'Knowledge Persistence',
    type: PatternType.DEV_PATTERN,
    icon: '📚',
    examples: [
      "That worked well.\nUpdate the Skills file (or AGENTS.md) to record:\n  • the pattern we used\n  • the constraint that prevented the earlier mistake\n  • any new conventions discovered during this task\nSo the next session starts with this knowledge already loaded."
    ]
  },
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
    id: 'pat-minimal-patch',
    trigger: 'Do not rewrite this module. Apply the smallest reviewable patch that addresses only the stated problem. Leave everything else exactly as it is.',
    purpose: 'Prevents wholesale rewrites during focused fixes',
    implication: 'Scope Containment',
    type: PatternType.DEV_PATTERN,
    icon: '🔒',
    examples: [
      "Do not rewrite this module.\nApply the smallest reviewable patch that addresses only the stated problem.\nLeave everything else exactly as it is.",
      "Produce the minimal patch required to fix the bug.\nDo not modify unrelated files."
    ]
  },
  {
    id: 'pat-deletion-first',
    trigger: 'Do not add [X] automatically. First evaluate whether [Y] should simply be removed. Only propose an extension if removal is not safe.',
    purpose: 'Prevents reflexive code addition; forces deletion to be evaluated as a first-class option',
    implication: 'Deletion Audit',
    type: PatternType.DEV_PATTERN,
    icon: '🗑️',
    examples: [
      "Do not add a fallback automatically.\nFirst evaluate whether the old cache path should simply be removed.\nOnly propose an extension if removal is not safe.",
      "Look for code that can be deleted instead of extended.\nList each candidate with a one-line reason why it is safe to remove."
    ]
  },
  {
    id: 'pat-enforce-simplicity',
    trigger: 'Prefer the simplest solution that satisfies the requirements. Do not introduce new abstractions unless the task explicitly requires them.',
    purpose: 'Counters the LLM default tendency to over-engineer with unnecessary abstractions and speculative flexibility',
    implication: 'Anti-Overengineering',
    type: PatternType.DEV_PATTERN,
    icon: '🪞',
    examples: [
      "Implement the caching layer.\nPrefer the simplest solution that satisfies the requirements.\nDo not introduce new abstractions unless the task explicitly requires them.\nDo not add speculative flexibility, configuration nobody requested, or defensive code for impossible situations.\nIf the implementation exceeds what a senior engineer would consider minimal, simplify it before proposing."
    ]
  },
  {
    id: 'pat-direct-correction',
    trigger: 'This patch violates the task constraints. Problems: [list]. Discard it and restart with: [numbered criteria].',
    purpose: 'Sends an unambiguous rejection signal with explicit restart criteria instead of soft hedging',
    implication: 'Directness Over Politeness',
    type: PatternType.DEV_PATTERN,
    icon: '❌',
    examples: [
      "This patch violates the task constraints.\n\nProblems:\n- public API changed\n- regression test missing\n- unrelated files modified\n\nDiscard it and restart with:\n1. failing test first\n2. minimal patch\n3. raw validator output"
    ]
  },
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
    id: 'pat-attention-steering',
    trigger: 'Focus only on [File A] and [File B]. Ignore unrelated modules unless you find direct evidence they are involved.',
    purpose: 'Limits the model\'s attention to relevant files and explicitly excludes everything else',
    implication: 'Attention Limiting',
    type: PatternType.DEV_PATTERN,
    icon: '🔭',
    examples: [
      "Focus only on src/UserAccountService.php and tests/Unit/UserAccountServiceTest.php.\nIgnore unrelated modules unless you find direct evidence they are involved.",
      "Use AbstractValueObject and the existing immutable classes as the pattern source."
    ]
  },
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
