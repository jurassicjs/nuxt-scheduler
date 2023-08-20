import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";
import { defaultStorage as storage } from "~~/server/app/services/storage";

export default defineNitroPlugin(() => {
  startScheduler()

  async function doSomething() {
    const examplePromise = new Promise((resolve, reject) => {
      // Simulating async operation using setTimeout
      setTimeout(() => {
        const isSuccessful = Math.random() >= 0.5; // Randomly decide if the operation is successful

        if (isSuccessful) {
          resolve('Operation successful!');
        } else {
          reject('Operation failed!');
        }
      }, 1000); // Wait for 1 second
    });
    return await examplePromise
  }

  async function sendNewsLetter() {
    return 'newsletter sent'
  }


  function startScheduler() {
    const scheduler = useScheduler();
    scheduler.setStorage(storage)

    scheduler.run('cool:beans', () => {
      return say("xxx cool beans! I run every 20 seconds! But I don't save the output");
    }).everySeconds(5).setJobDescription('whatever').saveOutput()

    scheduler.run('scheduler:newsletter', async () => {
      say("I send a newsletter every minute! I also save the output");
      return await sendNewsLetter()
    }).everyMinute().setJobDescription('send newsletter to subscribers').saveOutput()

    scheduler.run('heyYou', async () => {
      throw new Error('This is the error and it is not cool yo 🥲')
      return doSomething()
    }).everyMinute().setJobDescription('just doing my job').saveOutput()
    
    scheduler.run('cron', () => {
      say("Running a job at 21:23 PM at Europe/Berlin 😀");
    }).cron('23 21 * * *', 'Europe/Berlin').setJobDescription('I do Something via cron').saveOutput()

    // create as many tasks as you want here
  }
})
