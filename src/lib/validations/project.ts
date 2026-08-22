import { z } from "zod";
import { PROJECT_TYPES } from "@/types/project";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must contain at least 2 characters.")
    .max(120, "Project name cannot exceed 120 characters."),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters.")
    .transform((value) => value || null),

  type: z.enum(PROJECT_TYPES, {
    error: "Choose a valid project type.",
  }),

  targetDate: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Choose a valid target date.",
    })
    .transform((value) => value || null),
});
