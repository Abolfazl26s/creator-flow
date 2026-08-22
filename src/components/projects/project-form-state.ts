export type CreateProjectState = {
  status: "idle" | "error";
  message: string;
  fieldErrors?: {
    name?: string[];
    description?: string[];
    type?: string[];
    targetDate?: string[];
  };
};

export const initialCreateProjectState: CreateProjectState = {
  status: "idle",
  message: "",
};
