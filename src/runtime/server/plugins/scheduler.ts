import startScheduler from '~/server/app/scheduler.ts'

export default defineNitroPlugin(() => {
  if(startScheduler) {
    startScheduler()
  }

})
