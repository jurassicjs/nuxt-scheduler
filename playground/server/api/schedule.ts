import { storage } from "~/server/app/services/storage"

export default defineEventHandler(async () => {
  try {
    const all = await storage.getKeys()
    const schedulerLog: (string | number | boolean | object | null)[] = []
    const schedulerKeys = all.filter((key: string) => key.startsWith('scheduler:'))

    await Promise.all(schedulerKeys.map(async (key: string) => {
      const item =  await storage.getItem(key)
      console.log('item', item)
      schedulerLog.push({jobKey: key, entries: item})
    }))

    console.log('schedulerLog', schedulerLog)

    return {
      schedulerLog
    }
  }
  catch (e) {
    if (e instanceof Error) {
      return { message: 'there was a problem', error: e.message }
    }
  }
})
