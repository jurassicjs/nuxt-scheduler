
export interface SchedulerObject {
  saveOutputTo: (key: string) => void
  setJobDescription: (jobDescription: string) => SchedulerObject
}

export type InternalSchedulerObject = {
  jobDescription: string;
  passed: boolean;
  schedulerKey: string;
  saveOutput: boolean;
  interval: string | undefined;
  input: string | undefined;
  timezone: string | undefined;
};

export type ScheduleLogEntry = {
  jobDescription: string;
  passed: boolean;
  interval: string;
  output: string;
  dateTime: string;
};
