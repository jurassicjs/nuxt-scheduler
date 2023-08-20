// @ts-ignore
import cron from 'node-cron';
import {saveToStorage} from './saveToStorage';
import { InternalSchedulerObject } from './types/Scheduler';

type MethodObject = {
  [key: string]: (...args: any[]) => any;
};

let scheduleRegister: Map<string, InternalSchedulerObject> = new Map();

function registerJob(key: string, internalSchedulerObject: InternalSchedulerObject) {
  // console.log(`registering key: ${key}`)
  scheduleRegister.set(key, internalSchedulerObject);
}

export function getscheduleRegister() {
  const scheduleObject = Array.from(scheduleRegister.entries()).map(([key, scheduleObject]) => ({
    key,
    ...scheduleObject
}));

  return scheduleObject;
}

export function run(key: string, callback: Function) {
  const schedulerObject = {
    saveOutput: () => saveOutput(),
    setJobDescription: (jobDescription: string) => setJobDescription(jobDescription),
  }

  const internalSchedulerObject: InternalSchedulerObject = {
    jobDescription: 'default',
    passed: false,
    schedulerKey: 'scheduler:default',
    saveOutput: false,
    interval: undefined,
    input: undefined,
    timezone: undefined
  }

  function wrapWithProxy(targetObject: MethodObject): MethodObject {
    return new Proxy(targetObject, {
      get(target, propName, receiver) {
        if (typeof propName === "symbol") return;
        const origMethod = target[propName];
        if (typeof origMethod === 'function') {
          return function(...args: any[]) {
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
            // Call the original method
            const result = origMethod.apply(target, args);
            console.log({interval: origMethod.name, input: args[0], timezone: args[1]})
            internalSchedulerObject.interval = origMethod.name
            internalSchedulerObject.input = args[0]
            internalSchedulerObject.timezone = args[1]
            return result;
          }.bind(target);
        }
        return origMethod;
      }
    });
  }

  function saveOutput(): void {
    internalSchedulerObject.saveOutput = true;
    if (!key.startsWith('scheduler:')) {
      const newKey = `scheduler:${key}`
      console.error(
        `key in saveOutputTo(key) must start with 'scheduler:' ${key} does not. updated to ${newKey}`
      )
      key = newKey
    }
    internalSchedulerObject.schedulerKey = key
  }

  registerJob(key, internalSchedulerObject)
  

  function setJobDescription(jobDescription: string) {
    internalSchedulerObject.jobDescription = jobDescription
    registerJob(key, internalSchedulerObject); // re-register with the updated description
    return schedulerObject
  }

  async function executeAndHandleError(callback: Function, schedule: string) {
    try {
      const output = await callback()
      if (internalSchedulerObject.saveOutput) {
        internalSchedulerObject.passed = true
        await saveToStorage(internalSchedulerObject, schedule, output)
      }
    } catch (error) {
      if (internalSchedulerObject.saveOutput) {
        internalSchedulerObject.passed = false
        let errorMessage = 'could not parse'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        await saveToStorage(internalSchedulerObject, schedule, JSON.stringify({errorMessage: errorMessage, error: error}))
      }
    }
  }

 const intervalMethods = {
    everySecond:() => {
      cron.schedule('* * * * * *', async () => {
        await executeAndHandleError(callback, 'everySecond')
      });
      return schedulerObject
    },
    everySeconds: (seconds: number = 1) => {
      cron.schedule(`*/${seconds} * * * * *`, async () => {
        await executeAndHandleError(callback, `every ${seconds} seconds`)
      });
      return schedulerObject
    },
    everyMinute: () => {
      cron.schedule('* * * * *', async () => {
        await executeAndHandleError(callback, `everyMinute`)
      });
      return schedulerObject
    },
    everyTwoMinutes: () => {
      cron.schedule('*/2 * * * *', async () => {
        await executeAndHandleError(callback, `everyTwoMinute`)
      });
      return schedulerObject
    },
    everyThreeMinutes: () => {
      cron.schedule('*/3 * * * *', async () => {
        await executeAndHandleError(callback, `everyThreeMinute`)
      });
      return schedulerObject
    },
    everyFourMinutes: () => {
      cron.schedule('*/4 * * * *', async () => {
        await executeAndHandleError(callback, `everyFourMinutes`)
      });
      return schedulerObject
    },
    everyFiveMinutes: () => {
      cron.schedule('*/5 * * * *', async () => {
        await executeAndHandleError(callback, `everyFiveMinutes`)
      });
      return schedulerObject
    },
    everyTenMinutes: () => {
      cron.schedule('*/10 * * * *', async () => {
        await executeAndHandleError(callback, `everyTenMinutes`)
      });
      return schedulerObject
    },
    everyFifteenMinutes: () => {
      cron.schedule('*/15 * * * *', async () => {
        await executeAndHandleError(callback, `everyFifteenMinutes`)
      });
      return schedulerObject
    },
    everyThirtyMinutes: () => {
      cron.schedule('*/30 * * * *', async () => {
        await executeAndHandleError(callback, `everyThirtyMinutes`)
      });
      return schedulerObject
    },
    everyMinutes: (minutes: number) => {
      cron.schedule(`*/${minutes} * * * *`, async () => {
        await executeAndHandleError(callback, `everyMinutes`)
      });
      return schedulerObject
    },
    hourly: () => {
      cron.schedule('0 * * * *', async () => {
        await executeAndHandleError(callback, `hourly`)
      });
      return schedulerObject
    },
    everyHours: (hours: number) => {
      cron.schedule(`0 */${hours} * * *`, async () => {
        await executeAndHandleError(callback, `everyHours`)
      });
      return schedulerObject
    },
    hourlyAt: (minute: number) => {
      cron.schedule(`${minute} * * * *`, async () => {
        await executeAndHandleError(callback, `hourlyAt`)
      });
      return schedulerObject
    },
    everyOddHour: () => {
      cron.schedule('0 */2 * * *', async () => {
        await executeAndHandleError(callback, `everyOddHour`)
      });
      return schedulerObject
    },
    everyTwoHours: () => {
      cron.schedule('0 */2 * * *', async () => {
        await executeAndHandleError(callback, `everyTwoHours`)
      });
      return schedulerObject
    },
    everyThreeHours: () => {
      cron.schedule('0 */3 * * *', async () => {
        await executeAndHandleError(callback, `everyThreeHours`)
      });
      return schedulerObject
    },
    everyFourHours: () => {
      cron.schedule('0 */4 * * *', async () => {
        await executeAndHandleError(callback, `everyFourHours`)
      });
      return schedulerObject
    },
    everySixHours: () => {
      cron.schedule('0 */6 * * *', async () => {
        await executeAndHandleError(callback, `everySixHours`)
      });
      return schedulerObject
    },
    dailyAt: (hour: number, minute: number) => {
      cron.schedule(`${minute} ${hour} * * *`, async () => {
        await executeAndHandleError(callback, `dailyAt`)
      });
      return schedulerObject
    },
    daily: () => {
      cron.schedule('0 0 * * *', async () => {
        await executeAndHandleError(callback, `daily`)
      });
      return schedulerObject
    },
    everyDays: (days: number) => {
      cron.schedule(`0 0 */${days} * *`, async () => {
        await executeAndHandleError(callback, `everyDays`)
      });
      return schedulerObject
    },
    weekly: () => {
      cron.schedule('0 0 * * 0', async () => {
        await executeAndHandleError(callback, `weekly`)
      });
      return schedulerObject
    },
    quarterly: () => {
      cron.schedule('0 0 1 */3 *', async () => {
        await executeAndHandleError(callback, `quarterly`)
      });
      return schedulerObject
    },
    yearly: () => {
      cron.schedule('0 0 1 1 *', async () => {
        await executeAndHandleError(callback, `yearly`)
      });
      return schedulerObject
    },
    cron: (interval: string, timezone?: string) => {
      timezone ? cron.schedule(interval, async () => {
        await executeAndHandleError(callback, `cron_${interval}_${timezone}`)
      }, {scheduled: true, timezone: timezone}) : cron.schedule(interval, async () => {
        await executeAndHandleError(callback, `cron_${interval}`)
      });
      return schedulerObject
    }

  }
  return  wrapWithProxy(intervalMethods);
}
