// @ts-ignore
import cron from 'node-cron';
import {saveToStorage} from './saveToStorage';
import {setStorage} from './useScheduler';

export function run(callback: Function) {
  const schedulerObject = {
    setStorage,
    run,
    saveOutputTo: (key: string) => saveOutputTo(key),
    saveOutput: false,
    schedulerKey: 'scheduler:lastRun',
    setJobDescription: (jobDescription: string) => setJobDescription(jobDescription),
    jobDescription: 'default',
    passed: false
  }

  function saveOutputTo(key: string): void {
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

  function setJobDescription(jobDescription: string) {
    schedulerObject.jobDescription = jobDescription
    return schedulerObject
  }

  async function executeAndHandleError(callback: Function, schedulerObject: any, schedule: string) {
    try {
      const output = await callback()
      if (schedulerObject.saveOutput) {
        schedulerObject.passed = true
        await saveToStorage(schedulerObject, schedule, output)
      }
    } catch (error) {
      if (schedulerObject.saveOutput) {
        schedulerObject.passed = false
        let errorMessage = 'could not parse'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        await saveToStorage(schedulerObject, schedule, JSON.stringify({errorMessage: errorMessage, error: error}))
      }
    }
  }

  return {
    everySecond:() => {
      cron.schedule('* * * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, 'everySecond')
      });
      return schedulerObject
    },
    everySeconds: (seconds: number = 1) => {
      cron.schedule(`*/${seconds} * * * * *`, async () => {
        await executeAndHandleError(callback, schedulerObject, `every ${seconds} seconds`)
      });
      return schedulerObject
    },
    everyMinute: () => {
      cron.schedule('* * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyMinute`)
      });
      return schedulerObject
    },
    everyTwoMinutes: () => {
      cron.schedule('*/2 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyTwoMinute`)
      });
      return schedulerObject
    },
    everyThreeMinutes: () => {
      cron.schedule('*/3 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyThreeMinute`)
      });
      return schedulerObject
    },
    everyFourMinutes: () => {
      cron.schedule('*/4 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyFourMinutes`)
      });
      return schedulerObject
    },
    everyFiveMinutes: () => {
      cron.schedule('*/5 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyFiveMinutes`)
      });
      return schedulerObject
    },
    everyTenMinutes: () => {
      cron.schedule('*/10 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyTenMinutes`)
      });
      return schedulerObject
    },
    everyFifteenMinutes: () => {
      cron.schedule('*/15 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyFifteenMinutes`)
      });
      return schedulerObject
    },
    everyThirtyMinutes: () => {
      cron.schedule('*/30 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyThirtyMinutes`)
      });
      return schedulerObject
    },
    everyMinutes: (minutes: number) => {
      cron.schedule(`*/${minutes} * * * *`, async () => {
        await executeAndHandleError(callback, schedulerObject, `everyMinutes`)
      });
      return schedulerObject
    },
    hourly: () => {
      cron.schedule('0 * * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `hourly`)
      });
      return schedulerObject
    },
    everyHours: (hours: number) => {
      cron.schedule(`0 */${hours} * * *`, async () => {
        await executeAndHandleError(callback, schedulerObject, `everyHours`)
      });
      return schedulerObject
    },
    hourlyAt: (minute: number) => {
      cron.schedule(`${minute} * * * *`, async () => {
        await executeAndHandleError(callback, schedulerObject, `hourlyAt`)
      });
      return schedulerObject
    },
    everyOddHour: () => {
      cron.schedule('0 */2 * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyOddHour`)
      });
      return schedulerObject
    },
    everyTwoHours: () => {
      cron.schedule('0 */2 * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyTwoHours`)
      });
      return schedulerObject
    },
    everyThreeHours: () => {
      cron.schedule('0 */3 * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyThreeHours`)
      });
      return schedulerObject
    },
    everyFourHours: () => {
      cron.schedule('0 */4 * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everyFourHours`)
      });
      return schedulerObject
    },
    everySixHours: () => {
      cron.schedule('0 */6 * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `everySixHours`)
      });
      return schedulerObject
    },
    dailyAt: (hour: number, minute: number) => {
      cron.schedule(`${minute} ${hour} * * *`, async () => {
        await executeAndHandleError(callback, schedulerObject, `dailyAt`)
      });
      return schedulerObject
    },
    daily: () => {
      cron.schedule('0 0 * * *', async () => {
        await executeAndHandleError(callback, schedulerObject, `daily`)
      });
      return schedulerObject
    },
    everyDays: (days: number) => {
      cron.schedule(`0 0 */${days} * *`, async () => {
        await executeAndHandleError(callback, schedulerObject, `everyDays`)
      });
      return schedulerObject
    },
    weekly: () => {
      cron.schedule('0 0 * * 0', async () => {
        await executeAndHandleError(callback, schedulerObject, `weekly`)
      });
      return schedulerObject
    },
    quarterly: () => {
      cron.schedule('0 0 1 */3 *', async () => {
        await executeAndHandleError(callback, schedulerObject, `quarterly`)
      });
      return schedulerObject
    },
    yearly: () => {
      cron.schedule('0 0 1 1 *', async () => {
        await executeAndHandleError(callback, schedulerObject, `yearly`)
      });
      return schedulerObject
    },
    cron: (interval: string, timezone?: string) => {
      timezone ? cron.schedule(interval, async () => {
        await executeAndHandleError(callback, schedulerObject, `cron_${interval}_${timezone}`)
      }, {scheduled: true, timezone: timezone}) : cron.schedule(interval, async () => {
        await executeAndHandleError(callback, schedulerObject, `cron_${interval}`)
      });
      return schedulerObject
    }
  }
}
