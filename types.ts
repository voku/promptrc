export enum PatternType {
  RITUAL = 'RITUAL',
  DEV_PATTERN = 'DEV_PATTERN',
  COMBINATION = 'COMBINATION'
}

export interface PromptPattern {
  id: string;
  trigger: string;
  purpose: string;
  implication: string;
  type: PatternType;
  icon?: string;
  description?: string;
  examples: string[];
}