import cron from 'node-cron';
import { storage } from '~~/server/app/services/storage';

let mySchedulerStorage = storage
function getSchedulerStorage() {
  return storage
}

function setStorage(schedulerStorage: Storage) {
  mySchedulerStorage = schedulerStorage
}

type Storage = typeof mySchedulerStorage
interface SchedulerObject {
  setStorage: (schedulerStorage: Storage) => void
  run: (callback: Function) => Scheduler
  saveOutputTo: (key: string) => void
  saveOutput: boolean
  schedulerKey: string
  setJobDescription: (jobDescription: string) => SchedulerObject
  jobDescription: string
  passed: boolean
}
export interface Scheduler {
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

export function useScheduler() {

  function saveOutputTo(schedulerObject: SchedulerObject, key: string): void {
    schedulerObject.saveOutput = true;
    if (!key.startsWith('scheduler:')) {
      const newKey = `scheduler:${key}`
      console.error(
        `key in saveOutputTo(key) must start with 'scheduler:' ${key} does not. updated to ${newKey}`
      )
      key = newKey
    }
    schedulerObject.schedulerKey = key
  }

  async function saveToStorage(schedulerObject: SchedulerObject, interval: string, output: string) {
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
    theStorage.setItem("app:test", 'cool');
    theStorage.setItem(schedulerObject.schedulerKey, item)
  }

  function run(callback: Function): Scheduler {
    const schedulerObject = {
      setStorage,
      run,
      saveOutputTo: (key: string) => saveOutputTo(schedulerObject, key),
      saveOutput: false,
      schedulerKey: 'scheduler:lastRun',
      setJobDescription: (jobDescription: string) => setJobDescription(jobDescription),
      jobDescription: 'default',
      passed: false
    }

    function setJobDescription(jobDescription: string) {
      schedulerObject.jobDescription = jobDescription
      return schedulerObject
    }

    async function executeAndHandleError(callback: Function, schedulerObject: SchedulerObject, schedule: string) {
      try {
        const output = await callback()
        if (schedulerObject.saveOutput) {
          schedulerObject.passed = true
          saveToStorage(schedulerObject, schedule, output)
        }
      } catch (error) {
        if (schedulerObject.saveOutput) {
          schedulerObject.passed = false
          let errorMessage = 'could not parse'
          if (error instanceof Error) {
            errorMessage = error.message
          }
          saveToStorage(schedulerObject, schedule, JSON.stringify({ errorMessage: errorMessage, error: error }))
        }
      }
    }

    return {
      everySecond: () => {
        cron.schedule('* * * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, 'everySecond')
        });
        return schedulerObject
      },
      everySeconds: (seconds: number = 1) => {
        cron.schedule(`*/${seconds} * * * * *`, async () => {
          executeAndHandleError(callback, schedulerObject, `every ${seconds} seconds`)
        });
        return schedulerObject
      },
      everyMinute: () => {
        cron.schedule('* * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyMinute`)
        });
        return schedulerObject
      },
      everyTwoMinutes: () => {
        cron.schedule('*/2 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyTwoMinute`)
        });
        return schedulerObject
      },
      everyThreeMinutes: () => {
        cron.schedule('*/3 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyThreeMinute`)
        });
        return schedulerObject
      },
      everyFourMinutes: () => {
        cron.schedule('*/4 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyFourMinutes`)
        });
        return schedulerObject
      },
      everyFiveMinutes: () => {
        cron.schedule('*/5 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyFiveMinutes`)
        });
        return schedulerObject
      },
      everyTenMinutes: () => {
        cron.schedule('*/10 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyTenMinutes`)
        });
        return schedulerObject
      },
      everyFifteenMinutes: () => {
        cron.schedule('*/15 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyFifteenMinutes`)
        });
        return schedulerObject
      },
      everyThirtyMinutes: () => {
        cron.schedule('*/30 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyThirtyMinutes`)
        });
        return schedulerObject
      },
      everyMinutes: (minutes: number) => {
        cron.schedule(`*/${minutes} * * * *`, async () => {
          executeAndHandleError(callback, schedulerObject, `everyMinutes`)
        });
        return schedulerObject
      },
      hourly: () => {
        cron.schedule('0 * * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `hourly`)
        });
        return schedulerObject
      },
      everyHours: (hours: number) => {
        cron.schedule(`0 */${hours} * * *`, async () => {
          executeAndHandleError(callback, schedulerObject, `everyHours`)
        });
        return schedulerObject
      },
      hourlyAt: (minute: number) => {
        cron.schedule(`${minute} * * * *`, async () => {
          executeAndHandleError(callback, schedulerObject, `hourlyAt`)
        });
        return schedulerObject
      },
      everyOddHour: () => {
        cron.schedule('0 */2 * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyOddHour`)
        });
        return schedulerObject
      },
      everyTwoHours: () => {
        cron.schedule('0 */2 * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyTwoHours`)
        });
        return schedulerObject
      },
      everyThreeHours: () => {
        cron.schedule('0 */3 * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyThreeHours`)
        });
        return schedulerObject
      },
      everyFourHours: () => {
        cron.schedule('0 */4 * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everyFourHours`)
        });
        return schedulerObject
      },
      everySixHours: () => {
        cron.schedule('0 */6 * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `everySixHours`)
        });
        return schedulerObject
      },
      dailyAt: (hour: number, minute: number) => {
        cron.schedule(`${minute} ${hour} * * *`, async () => {
          executeAndHandleError(callback, schedulerObject, `dailyAt`)
        });
        return schedulerObject
      },
      daily: () => {
        cron.schedule('0 0 * * *', async () => {
          executeAndHandleError(callback, schedulerObject, `daily`)
        });
        return schedulerObject
      },
      everyDays: (days: number) => {
        cron.schedule(`0 0 */${days} * *`, async () => {
          executeAndHandleError(callback, schedulerObject, `everyDays`)
        });
        return schedulerObject
      },
      weekly: () => {
        cron.schedule('0 0 * * 0', async () => {
          executeAndHandleError(callback, schedulerObject, `weekly`)
        });
        return schedulerObject
      },
      quarterly: () => {
        cron.schedule('0 0 1 */3 *', async () => {
          executeAndHandleError(callback, schedulerObject, `quarterly`)
        });
        return schedulerObject
      },
      yearly: () => {
        cron.schedule('0 0 1 1 *', async () => {
          executeAndHandleError(callback, schedulerObject, `yearly`)
        });
        return schedulerObject
      },
      cron: (interval: string, timezone?: string) => {
        timezone ? cron.schedule(interval, async () => {
          executeAndHandleError(callback, schedulerObject, `cron_${interval}_${timezone}`)
        }, { scheduled: true, timezone: timezone }) : cron.schedule(interval, async () => {
          executeAndHandleError(callback, schedulerObject, `cron_${interval}`)
        });
        return schedulerObject
      }
    }
  }

  return {
    setStorage,
    run,
    saveOutputTo
  }
}

