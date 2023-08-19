
export interface SchedulerObject {
  saveOutputTo: (key: string) => void
  setJobDescription: (jobDescription: string) => SchedulerObject
}

export type InternalSchedulerObject = {
  jobDescription: string;
  passed: boolean;
  schedulerKey: string;
  saveOutput: boolean;
};
