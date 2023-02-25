import cron from 'node-cron';
import consola from 'consola';

export interface Runner {
  everySecond: () => void;
  everySeconds: (seconds: number) => void;
  everyMinute: () => void;
  everyFiveMinutes: () => void;
  everyMinutes: (minutes: number) => void;
  everyHour: () => void;
  everyHours: (hours: number) => void;
  everyDay: () => void;
  everyDays: (days: number) => void;
  setRawInterval: (interval: string) => void;
}

function run(callback: Function): Runner {
  return {
    everySecond: () => {
      cron.schedule('* * * * * *', callback);
    },
    everySeconds: (seconds: number = 1) => {
      cron.schedule(`*/${seconds} * * * * *`, callback);
    },
    everyMinute: () => {
      cron.schedule('* * * * *', callback);
    },
    everyFiveMinutes: () => {
      cron.schedule('*/5 * * * *', callback);
    },
    everyMinutes: (minutes: number) => {
      cron.schedule(`*/${minutes} * * * *`, callback);
    },
    everyHour: () => {
      cron.schedule('0 * * * *', callback);
    },
    everyHours: (hours: number) => {
      cron.schedule(`0 */${hours} * * *`, callback);
    },
    everyDay: () => {
      cron.schedule('0 0 * * *', callback);
    },
    everyDays: (days: number) => {
      cron.schedule(`0 0 */${days} * *`, callback);
    },
    setRawInterval: (interval: string) => {
      cron.schedule(interval, callback);
    }
  };
}

const start = () => {
  consola.info('Scheduler started');
};


export function useScheduler() {
  return {
    run,
    start
  };
}
