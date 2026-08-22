export const PROJECT_TYPES = [
  "video",
  "audio",
  "social",
  "writing",
  "other",
] as const;

export const PROJECT_STATUSES = [
  "planned",
  "in_progress",
  "review",
  "completed",
  "archived",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type Project = {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  type: ProjectType;
  status: ProjectStatus;
  progress: number;
  target_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};
