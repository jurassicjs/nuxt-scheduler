import { defaultStorage as storage } from "~/server/app/services/storage"
import { getscheduleRegister } from "../services/run"
import { ScheduleLogEntry } from "../services/types/Scheduler"

// @ts-ignore
export default defineEventHandler(async () => {
  try {
    const register = getscheduleRegister()

    console.log('fetching logs . . . ', )

    type job = {
      jobKey: string,
      entries: any   
    }

    const all = await storage.getKeys()
    const schedulerLog: job[] = []

    console.log('+++++++++++++++++all', all)
    const schedulerKeys = all.filter((key: string) => key.startsWith('scheduler:'))

    await Promise.all(schedulerKeys.map(async (key: string) => {
     
      const item = await storage.getItem(key)
      console.log('getting key: ', key)
      console.log()
      schedulerLog.push({ jobKey: key, entries: item })
    }))

    const tasks = register.map((entry) => {
      console.log(`'entry.key',${ entry.key}`)
     const matchingLogs:[] | ScheduleLogEntry[] =  schedulerLog.find(log => log.jobKey == entry.key )?.entries || []
     return {...entry, matchingLogs}
    })


    tasks.forEach(task => {
      console.log('$$$$ matching logs', task.key, task.matchingLogs)
    })

    
    return tasks
    
  } catch (e) {
    if (e instanceof Error) {
      return { message: 'there was a problem', error: e.message }
    }
  }
})
