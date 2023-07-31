import {defaultStorage as storage} from "~/server/app/services/storage"

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

    return {
      schedulerLog
    }
  } catch (e) {
    if (e instanceof Error) {
      return {message: 'there was a problem', error: e.message}
    }
  }
})
