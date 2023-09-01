import { defaultStorage as storage } from "~/server/app/services/storage"
import { getScheduleRegister } from "../services/run"
import { ScheduleLogEntry } from "../services/types/Scheduler"
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  try {
    const register = getScheduleRegister()
    type job = {
      jobKey: string,
      entries: any
    }

    const all = await storage.getKeys()
    const schedulerLog: job[] = []
    const schedulerKeys = all.filter((key: string) => key.startsWith('scheduler:'))

    await Promise.all(schedulerKeys.map(async (key: string) => {
      const item = await storage.getItem(key)
      schedulerLog.push({ jobKey: key, entries: item })
    }))

    const tasks = register.map((entry) => {
      console.log(`'entry.key',${ entry.key}`)
     const matchingLogs:[] | ScheduleLogEntry[] =  schedulerLog.find(log => log.jobKey == entry.key )?.entries || []
     return {...entry, matchingLogs}
    })

    return tasks

  } catch (e) {
    if (e instanceof Error) {
      return { message: 'there was a problem', error: e.message }
    }
  }
})
