import {defaultStorage as storage} from "~/server/app/services/storage"
import { getscheduleRegister } from "../services/run"

// @ts-ignore
export default defineEventHandler(async () => {
  try {
    const all = await storage.getKeys()
    const schedulerLog: (string | number | boolean | object | null)[] = []
    const schedulerKeys = all.filter((key: string) => key.startsWith('scheduler:'))

    await Promise.all(schedulerKeys.map(async (key: string) => {
      const item = await storage.getItem(key)
      schedulerLog.push({jobKey: key, entries: item})
    }))

    const register =  getscheduleRegister()

    console.log(`XXXXXXXXXXXXXXXXXXx---> registered ${JSON.stringify(register)}`)

    return {
      schedulerLog,
      register
    }
  } catch (e) {
    if (e instanceof Error) {
      return {message: 'there was a problem', error: e.message}
    }
  }
})
