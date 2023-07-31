import {getSchedulerStorage} from './useScheduler';
import {InternalSchedulerObject} from "./types/Scheduler";

export async function saveToStorage(
  internalSchedulerObject: InternalSchedulerObject,
  interval: string,
  output: string
) {
  const theStorage = getSchedulerStorage()
  let item = []
  const hasKey = await theStorage.hasItem(internalSchedulerObject.schedulerKey)

  if (hasKey) {
    // @ts-ignore
    item = await theStorage.getItem(internalSchedulerObject.schedulerKey)
    console.log('getting item: ', item)
  }

  const log = {
    jobDescription: internalSchedulerObject.jobDescription,
    passed: internalSchedulerObject.passed,
    interval: interval,
    output: output,
    dateTime: new Date().toISOString()
  }

  item.push(log)

  await theStorage.setItem(internalSchedulerObject.schedulerKey, item)
}
