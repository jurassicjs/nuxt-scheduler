import type {SchedulerObject} from './types/Scheduler';
import {getSchedulerStorage} from './useScheduler';
export async function saveToStorage(schedulerObject: SchedulerObject, interval: string, output: string) {
  const theStorage = getSchedulerStorage()
  let item = []
  const hasKey = await theStorage.hasItem(schedulerObject.schedulerKey)
  if (hasKey) {
    // @ts-ignore
    item = await theStorage.getItem(schedulerObject.schedulerKey)
  }

  const log = {
    jobDescription: schedulerObject.jobDescription,
    passed: schedulerObject.passed,
    interval: interval,
    output: output,
    dateTime: new Date().toISOString()
  }

  item.push(log)
  await theStorage.setItem("app:test", 'cool');
  await theStorage.setItem(schedulerObject.schedulerKey, item)
}
