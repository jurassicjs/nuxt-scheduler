
export interface SchedulerObject {
  setStorage: (schedulerStorage: Storage) => void
  run: (callback: Function) => Intervals
  saveOutputTo: (key: string) => void
  saveOutput: boolean
  schedulerKey: string
  setJobDescription: (jobDescription: string) => SchedulerObject
  jobDescription: string
  passed: boolean
}
export interface Intervals {
  everySecond: (jobDescription?: string) => SchedulerObject;
  everySeconds: (seconds: number) => SchedulerObject;
  everyMinute: () => SchedulerObject;
  everyMinutes: (minutes: number) => SchedulerObject;
  everyTwoMinutes: () => SchedulerObject;
  everyThreeMinutes: () => SchedulerObject;
  everyFourMinutes: () => SchedulerObject;
  everyFiveMinutes: () => SchedulerObject;
  everyTenMinutes: () => SchedulerObject;
  everyFifteenMinutes: () => SchedulerObject;
  everyThirtyMinutes: () => SchedulerObject;
  hourly: () => SchedulerObject;
  hourlyAt: (minute: number) => SchedulerObject;
  everyOddHour: () => SchedulerObject;
  everyHours: (hours: number) => SchedulerObject;
  everyTwoHours: () => SchedulerObject;
  everyThreeHours: () => SchedulerObject;
  everyFourHours: () => SchedulerObject;
  everySixHours: () => SchedulerObject;
  daily: () => SchedulerObject;
  dailyAt: (hour: number, minute: number) => SchedulerObject;
  everyDays: (days: number) => SchedulerObject;
  weekly: () => SchedulerObject;
  quarterly: () => SchedulerObject;
  yearly: () => SchedulerObject;
  cron: (interval: string, timezone?: string) => SchedulerObject;
}
